import os
import requests
import io
import asyncio
from dotenv import load_dotenv
from app.astrology_client import AstrologyAPIClient
from app.pdf_utils import generate_cover_page, generate_end_page
from pypdf import PdfReader, PdfWriter

# Load env
load_dotenv()

async def debug_marathi():
    print("--- Debugging Marathi Report Flow ---")
    
    # 1. API Client
    user_id = os.getenv("ASTROLOGY_USER_ID", "616659")
    api_key = os.getenv("ASTROLOGY_API_KEY", "0a9bf90337d14972e821a590d761404611abd507")
    client = AstrologyAPIClient(user_id, api_key)
    
    print(f"Requesting Marathi ('mr') Report...")
    try:
        # 2. Get Report URL
        result = client.get_numerology_report_pdf(
            name="Marathi Test",
            dob_dt="01-01-1990",
            gender="male",
            language="mr"
        )
        pdf_url = result.get("pdf_url")
        print(f"API Returned URL: {pdf_url}")
        
        # 3. Download Raw
        print("Downloading RAW Report...")
        response = requests.get(pdf_url)
        with open("debug_marathi_raw.pdf", "wb") as f:
            f.write(response.content)
        print("Saved 'debug_marathi_raw.pdf'. Please open this file to check if it's in Marathi.")
        
        # 4. Attempt Merge
        print("Attempting Merge...")
        output = io.BytesIO()
        writer = PdfWriter()
        
        # Cover
        cover_stream = generate_cover_page("Marathi Test", "01-01-1990")
        cover_pdf = PdfReader(cover_stream)
        writer.add_page(cover_pdf.pages[0])
        
        # Body
        report_stream = io.BytesIO(response.content)
        report_pdf = PdfReader(report_stream)
        pages = len(report_pdf.pages)
        print(f"Raw PDF has {pages} pages.")
        
        for i in range(pages - 4 if pages > 4 else pages):
            writer.add_page(report_pdf.pages[i])
            
        # End
        end_stream = generate_end_page()
        end_pdf = PdfReader(end_stream)
        writer.add_page(end_pdf.pages[0])
        
        with open("debug_marathi_merged.pdf", "wb") as f:
            writer.write(output)
            f.write(output.getvalue())
            
        print("Saved 'debug_marathi_merged.pdf'.")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(debug_marathi())
