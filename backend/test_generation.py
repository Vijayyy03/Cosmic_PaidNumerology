
import asyncio
import os
import sys

# Ensure backend dir is in path
sys.path.append("/var/www/cosmic_backend")

try:
    from app.astrology_client import AstrologyAPIClient
    from app.pdf_utils import merge_report_with_branding
except ImportError:
    # Fallback to local relative import if running locally
    sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
    from app.astrology_client import AstrologyAPIClient
    from app.pdf_utils import merge_report_with_branding

async def test_generation():
    print("--- Starting Test Generation ---")
    
    # 1. Test Font Loading
    print("[1] Checking Fonts...")
    local_font = "/var/www/cosmic_backend/assets/fonts/NotoSansDevanagari-Regular.ttf"
    if os.path.exists(local_font):
        print(f"✅ Font found at {local_font}")
    else:
        print(f"❌ Font MISSING at {local_font}")

    # 2. Test AstrologyAPI
    print("\n[2] Testing AstrologyAPI Connection...")
    user_id = os.getenv("ASTROLOGY_USER_ID", "616659")
    api_key = os.getenv("ASTROLOGY_API_KEY", "0a9bf90337d14972e821a590d761404611abd507")
    client = AstrologyAPIClient(user_id, api_key)
    
    try:
        # Generate for 'Test User'
        pdf_data = client.get_numerology_report_pdf(
            name="Test User",
            dob_dt="01-01-2000",
            gender="male",
            language="en"
        )
        print(f"✅ API Success! PDF URL: {pdf_data.get('pdf_url')}")
        report_url = pdf_data.get('pdf_url')
    except Exception as e:
        print(f"❌ API Failed: {e}")
        return

    # 3. Test PDF Merge
    print("\n[3] Testing PDF Merge...")
    try:
        merged_pdf = await merge_report_with_branding(report_url, "Test User", "01-01-2000")
        output_path = "test_output.pdf"
        with open(output_path, "wb") as f:
            f.write(merged_pdf.getvalue())
        print(f"✅ Merge Success! Saved to {output_path}")
    except Exception as e:
        print(f"❌ Merge Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_generation())
