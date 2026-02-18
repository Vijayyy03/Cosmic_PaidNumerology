"""
FastAPI backend for Numerology Report Generator.
Provides API for numerology calculations and Google Sheets storage.
"""

import os
import razorpay
from contextlib import asynccontextmanager
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from threading import Thread
from app.email_utils import send_email_with_report

# Ensure we can import from 'app' package
try:
    from app.astrology_client import AstrologyAPIClient
    from app.pdf_utils import merge_report_with_branding
    from app.sheets import get_sheets_client, init_sheets_client
except ImportError:
    from backend.app.astrology_client import AstrologyAPIClient
    from backend.app.pdf_utils import merge_report_with_branding
    try:
        from backend.app.sheets import get_sheets_client, init_sheets_client
    except ImportError:
        get_sheets_client = lambda: None
        init_sheets_client = lambda x, y: None

load_dotenv()

# Base directory — defined early so lifespan cleanup_loop can reference it
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Razorpay setup
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
REPORT_PRICE = int(os.getenv("REPORT_PRICE_PAISE", "69900"))  # 699 INR in paise
razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# Request/Response Models
class NumerologyRequest(BaseModel):
    """Request body for numerology report generation."""
    name: str = Field(..., min_length=2, description="Full name")
    gender: str = Field(..., description="Gender (Male/Female/Other)")
    dob: str = Field(..., pattern=r"^\d{2}-\d{2}-\d{4}$", description="Date of birth (DD-MM-YYYY)")
    email: str = Field(..., description="Email address for report delivery")
    mobile: str = Field(None, description="Mobile number")
    language: str = Field(default="English", description="Report language")
    coupon_code: Optional[str] = Field(None, description="Applied coupon code")


class NumerologyResponse(BaseModel):
    """Response body containing the numerology report PDF URL."""
    pdf_url: str
    message: str = "Report generated successfully"


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    sheets_connected: bool


class OrderRequest(BaseModel):
    """Request body for creating a Razorpay order."""
    currency: str = Field(default="INR")
    form_data: Optional[NumerologyRequest] = None


class PaymentVerificationRequest(BaseModel):
    """Request body for verifying Razorpay payment."""
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    form_data: NumerologyRequest


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup/shutdown events.
    """
    # Startup: Connect to Google Sheets (optional check)
    print("Starting up Cosmic Numerology Backend...")
    
    # Initialize Sheets
    creds_file = os.getenv("GOOGLE_SHEETS_CREDENTIALS_FILE", "credentials.json")
    sheet_id = os.getenv("GOOGLE_SHEET_ID")
    
    if sheet_id:
        try:
            client = init_sheets_client(creds_file, sheet_id)
            if client.is_connected():
                client.setup_sheet_headers()
                print(f"[SHEETS] Connected to Sheet ID: {sheet_id}")
            else:
                print("[SHEETS] Failed to connect (Check credentials.json)")
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"[SHEETS] Initialization Error: {e}")
    else:
        print("[SHEETS] GOOGLE_SHEET_ID not set in .env")

    # Start Cleanup Task (Deletes reports older than 1 hour)
    import threading
    import time
    
    def cleanup_loop():
        while True:
            try:
                # Sleep first (e.g., check every 1 hour)
                time.sleep(3600)
                
                print("[CLEANUP] Checking for old reports...")
                cutoff = time.time() - 3600 # 1 hour ago
                
                report_dir = os.path.join(BASE_DIR, "static", "reports")
                if os.path.exists(report_dir):
                    for filename in os.listdir(report_dir):
                        if filename.endswith(".pdf"):
                            file_path = os.path.join(report_dir, filename)
                            # Check modification time
                            if os.path.getmtime(file_path) < cutoff:
                                try:
                                    os.remove(file_path)
                                    print(f"[CLEANUP] Deleted old report: {filename}")
                                except Exception as err:
                                    print(f"[CLEANUP ERROR] Failed to delete {filename}: {err}")
            except Exception as e:
                print(f"[CLEANUP THREAD ERROR] {e}")
                time.sleep(60) # Prevent tight loop on error

    # Start the daemon thread
    cleanup_thread = threading.Thread(target=cleanup_loop, daemon=True)
    cleanup_thread.start()
    print("[SYSTEM] Report cleanup task started (Auto-delete > 1 hour).")

    yield
    # Shutdown
    print("Shutting down...")


# Create FastAPI app
app = FastAPI(
    title="Cosmic Numerology API",
    description="Backend for generating numerology reports via AstrologyAPI",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware — Must be added BEFORE other middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://shivcosmic.com",
        "https://www.shivcosmic.com",
        "https://numerology.shivcosmic.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Files
# This allows accessing /static/reports/filename.pdf
static_dir = os.path.join(BASE_DIR, "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

# Helper for Rate Limiting behind Proxy (Nginx)
def get_real_ip(request: Request):
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0]
    return request.client.host

# Initialize Limiter with Proxy Support
limiter = Limiter(key_func=get_real_ip)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    # ... (content remains same, just ensuring context)
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
    response.headers["X-Content-Type-Options"] = "nosniff"
    # Allow embedding primarily for PDF reports
    response.headers["Content-Security-Policy"] = "frame-ancestors 'self' https://shivcosmic.com https://numerology.shivcosmic.com;"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

# Core report generation logic
async def process_numerology_generation(request: NumerologyRequest, base_url: str) -> str:
    """
    Calls AstrologyAPI to generate a numerology PDF, merges branding, saves locally,
    and returns the public URL to the saved PDF.
    """
    # Initialize API client
    astro_user_id = os.getenv("ASTROLOGY_API_USER_ID")
    astro_api_key = os.getenv("ASTROLOGY_API_KEY")

    if not astro_user_id or not astro_api_key:
        raise HTTPException(status_code=500, detail="Astrology API credentials not configured.")

    client = AstrologyAPIClient(user_id=astro_user_id, api_key=astro_api_key)

    # Map language
    lang_map = {"English": "en", "Hindi": "hi"}
    lang_code = lang_map.get(request.language, "en")

    # Call external API
    print(f"[API] Generating report for {request.name}, DOB: {request.dob}, Lang: {lang_code}")
    result = client.get_numerology_report_pdf(
        name=request.name,
        dob_dt=request.dob,
        gender=request.gender,
        language=lang_code
    )

    original_pdf_url = result.get("pdf_url") or result.get("response")
    if not original_pdf_url:
        raise HTTPException(status_code=500, detail="Failed to get PDF URL from Astrology API.")

    print(f"[API] Got PDF URL: {original_pdf_url}")

    # Save locally with unique filename
    import uuid
    filename = f"report_{uuid.uuid4().hex}.pdf"
    report_dir = os.path.join(BASE_DIR, "static", "reports")
    os.makedirs(report_dir, exist_ok=True)
    output_path = os.path.join(report_dir, filename)
    pdf_url = f"{base_url}/static/reports/{filename}"

    # Merge branding
    try:
        merged_pdf_stream = await merge_report_with_branding(
            report_url=original_pdf_url,
            name=request.name,
            dob=request.dob
        )
        with open(output_path, "wb") as f:
            f.write(merged_pdf_stream.getbuffer())
        print(f"[MERGE SUCCESS] Saved report to {output_path}")
        return pdf_url

    except Exception as e:
        print(f"[ERROR] Merge Failed: {e}")
        import traceback
        traceback.print_exc()
        # Fallback: return external URL directly
        return original_pdf_url


def record_transaction_in_sheets(request: NumerologyRequest, status: str = "PAID_GENERATED"):
    """
    Helper to record transaction in Google Sheets.
    Should be called in a background thread or directly.
    """
    try:
        client_sheets = get_sheets_client()
        if client_sheets:
            print(f"[SHEETS] Appending data for {request.name}...")
            client_sheets.append_report_data(
                name=request.name,
                gender=request.gender,
                dob=request.dob,
                email=request.email,
                mobile=request.mobile or "",
                language=request.language,
                status=status,
                coupon_code=request.coupon_code or ""
            )
        else:
            print("[SHEETS] Client not initialized (None).")
    except Exception as e:
        print(f"[SHEETS ERROR] Failed to append data: {e}")



# Deprecated/Legacy Point (Open for now, but frontend should move to /verify)
@app.post("/api/numerology/generate", response_model=NumerologyResponse)
async def generate_numerology_report(request: NumerologyRequest, req: Request):
    # STRICTLY SECURED: Disable free generation
    # User must go through /api/payment/verify
    raise HTTPException(
        status_code=403, 
        detail="Free generation is disabled. Please complete the payment process."
    )
    
    # OLD LOGIC (Commented out)
    # try:
    #     base_url = str(req.base_url).rstrip("/")
    #     pdf_url = await process_numerology_generation(request, base_url)
    #     return NumerologyResponse(pdf_url=pdf_url)
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))



@app.post("/api/numerology/generate-with-coupon", response_model=NumerologyResponse)
@limiter.limit("5/minute")
async def generate_with_coupon(request: Request, body: NumerologyRequest):
    """
    Generates report if valid coupon code is provided.
    """
    COUPON_CODE = "vijay"
    
    if not body.coupon_code or body.coupon_code.lower().strip() != COUPON_CODE:
         raise HTTPException(status_code=400, detail="Invalid Coupon Code")

    try:
        print(f"[COUPON USED] Code: {body.coupon_code} for {body.name}")
        
        # Record in Sheets (Background Thread to avoid blocking)
        Thread(target=record_transaction_in_sheets, args=(body, "COUPON_GENERATED")).start()

        base_url = str(request.base_url).rstrip("/")
        pdf_url = await process_numerology_generation(body, base_url)
        
        # Send Email (Background Thread)
        filename = pdf_url.split("/")[-1]
        pdf_path = os.path.join(BASE_DIR, "static", "reports", filename)
        
        email_thread = Thread(target=send_email_with_report, args=(
            body.email,
            "Your Cosmic Numerology Report",
            f"Namaste {body.name},\n\nHere is your personalized Numerology Report.\n\nMay the stars guide you!\n\nDr. Shivsharan Manshetti\nShiv Cosmic Energy Solutions",
            pdf_path
        ))
        email_thread.start()

        return NumerologyResponse(pdf_url=pdf_url)
    except Exception as e:
        print(f"Coupon Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------------------------------------
# Payment Endpoints (Razorpay)
# ---------------------------------------------------------

@app.post("/api/payment/create-order")
@limiter.limit("5/minute")
async def create_order(request: Request, body: OrderRequest):
    """
    Creates a Razorpay order.
    Also logs the attempt to Google Sheets.
    """
    try:
        # Log to Sheets (Pending Payment)
        if body.form_data:
            print(f"[PAYMENT INITIATED] Logging {body.form_data.name} to Sheets...")
            Thread(target=record_transaction_in_sheets, args=(body.form_data, "PAYMENT_INITIATED")).start()


        amount = REPORT_PRICE  # 699.00 INR
        
        order_data = {
            "amount": amount,
            "currency": body.currency,
            "receipt": "order_rcptid_11",
            "payment_capture": 1 # Auto capture
        }
        
        order = razorpay_client.order.create(data=order_data)
        
        # Return expected structure for Frontend
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": RAZORPAY_KEY_ID
        }
        
    except Exception as e:
        print(f"Razorpay Order Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/payment/verify", response_model=NumerologyResponse)
@limiter.limit("10/minute")
async def verify_payment(request: Request, body: PaymentVerificationRequest):
    """
    Verifies payment signature and generates report if successful.
    """
    try:
        # 1. Verify Signature
        params_dict = {
            'razorpay_order_id': body.razorpay_order_id,
            'razorpay_payment_id': body.razorpay_payment_id,
            'razorpay_signature': body.razorpay_signature
        }
        
        try:
            razorpay_client.utility.verify_payment_signature(params_dict)
        except razorpay.errors.SignatureVerificationError:
             raise HTTPException(status_code=400, detail="Payment Signature Verification Failed")

        print(f"[PAYMENT VERIFIED] Order: {body.razorpay_order_id} for {body.form_data.name}")

        # Record in Sheets (Background Thread)
        Thread(target=record_transaction_in_sheets, args=(body.form_data, "PAID_GENERATED")).start()

        # 2. Generate Report
        base_url = str(request.base_url).rstrip("/")
        pdf_url = await process_numerology_generation(body.form_data, base_url)
        
        # 3. Send Email (Background Thread)
        filename = pdf_url.split("/")[-1]
        pdf_path = os.path.join(BASE_DIR, "static", "reports", filename)
        
        email_thread = Thread(target=send_email_with_report, args=(
            body.form_data.email,
            "Your Cosmic Numerology Report",
            f"Namaste {body.form_data.name},\n\nHere is your personalized Numerology Report.\n\nMay the stars guide you!\n\nDr. Shivsharan Manshetti\nShiv Cosmic Energy Solutions",
            pdf_path
        ))
        email_thread.start()

        return NumerologyResponse(pdf_url=pdf_url)

    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Payment/Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
