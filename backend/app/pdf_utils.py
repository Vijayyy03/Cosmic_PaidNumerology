
import os
import io
import httpx
from datetime import datetime
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter

# Constants
# Use absolute path resolution
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # .../backend/app
BACKEND_DIR = os.path.dirname(BASE_DIR) # .../backend
ASSETS_DIR = os.path.join(BACKEND_DIR, "assets")

COVER_BG = os.path.join(ASSETS_DIR, "cover_bg.jpg")
END_BG = os.path.join(ASSETS_DIR, "end_bg.jpg")

# Font Configuration
DEFAULT_FONT = "Helvetica"
SERIF_FONT = "Times-Roman"
DEVANAGARI_FONT = "Helvetica" # Default fallback

try:
    # 1. Look for Local Font (Best for Production/Linux)
    local_font_path = os.path.join(ASSETS_DIR, "fonts", "NotoSansDevanagari-Regular.ttf")
    
    if os.path.exists(local_font_path):
        pdfmetrics.registerFont(TTFont('Devanagari', local_font_path))
        DEVANAGARI_FONT = "Devanagari"
        print(f"[DEBUG] Registered 'Devanagari' font from {local_font_path}")
        
    # 2. Fallback to Windows Font (Nirmala)
    elif os.path.exists("C:\\Windows\\Fonts\\nirmala.ttf"):
        pdfmetrics.registerFont(TTFont('Nirmala', "C:\\Windows\\Fonts\\nirmala.ttf"))
        DEVANAGARI_FONT = "Nirmala"
        print("[DEBUG] Registered 'Nirmala' font from Windows.")
        
except Exception as e:
    print(f"[WARNING] Font registration failed: {e}")

def get_font_for_text(text: str, default_font: str = DEFAULT_FONT) -> str:
    """
    Returns the appropriate font name based on the content of the text.
    If text contains Devanagari characters, returns the Devanagari font.
    Otherwise, returns the default (English/Latin) font.
    """
    if not text:
        return default_font
        
    for char in text:
        if '\u0900' <= char <= '\u097F':
            return DEVANAGARI_FONT
            
    return default_font

# Debug paths
print(f"PDF Utils initialized.")
print(f"Assets Dir: {ASSETS_DIR}")
print(f"Cover BG exists: {os.path.exists(COVER_BG)}")
print(f"End BG exists: {os.path.exists(END_BG)}")

def generate_cover_page(name: str, dob: str) -> io.BytesIO:
    """
    Generates a PDF cover page with the user's name and DOB.
    """
    packet = io.BytesIO()
    # Create the PDF object, using the buffer as its "file."
    c = canvas.Canvas(packet, pagesize=A4)
    width, height = A4
    
    # Draw Background
    print(f"[DEBUG] Looking for Cover BG at: {COVER_BG}")
    if os.path.exists(COVER_BG):
        print(f"[DEBUG] FOUND Cover BG. Drawing image...")
        try:
            c.drawImage(COVER_BG, 0, 0, width=width, height=height)
        except Exception as e:
            print(f"[ERROR] Failed to draw image: {e}")
            # Fallback
            c.setFillColorRGB(0.1, 0, 0) # Dark Red/Black
            c.rect(0, 0, width, height, fill=1)
    else:
        print(f"[DEBUG] Cover BG NOT FOUND at {COVER_BG}")
        # Fallback Gradient-like background
        c.setFillColorRGB(0.1, 0, 0) # Dark Red/Black
        c.rect(0, 0, width, height, fill=1)
        
    # Draw Text
    c.setFillColor(colors.white)
    
    # --- Name & DOB with Drop Shadow ---
    # Shadow Offset
    shadow_offset_x = 2
    shadow_offset_y = -2
    shadow_color = colors.Color(0, 0, 0, alpha=0.8)
    
    # Select Fonts
    name_font = get_font_for_text(name, SERIF_FONT)
    print(f"[DEBUG] Using font '{name_font}' for Name: {name}")
    
    # 1. Name Shadow
    c.setFont(name_font, 46) 
    c.setFillColor(shadow_color)
    c.drawCentredString(width / 2 + shadow_offset_x, 550 + shadow_offset_y, name)
    
    # 2. Name Main (Gold)
    c.setFillColorRGB(0.83, 0.68, 0.21) # Deep Gold
    c.drawCentredString(width / 2, 550, name)
    
    # Formatted DOB (Force English Month)
    formatted_dob = dob
    try:
        dt = datetime.strptime(dob, "%d-%m-%Y")
        # Manual mapping to avoid system locale issues (e.g., Hindi/Marathi months)
        months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"]
        month_name = months[dt.month - 1]
        formatted_dob = f"{dt.day} {month_name}, {dt.year}"
    except:
        pass

    # Select Font for DOB (Guaranteed English now)
    dob_font = DEFAULT_FONT # Always use Helvetica for date as per user request
    
    # 3. DOB Shadow
    c.setFont(dob_font, 20) 
    c.setFillColor(shadow_color)
    c.drawCentredString(width / 2 + shadow_offset_x, 500 + shadow_offset_y, formatted_dob)
    
    # 4. DOB Main (White)
    c.setFillColor(colors.white)
    c.drawCentredString(width / 2, 500, formatted_dob)
    
    # Footer / Branding
    c.setFont(DEFAULT_FONT, 16) 
    c.setFillColor(colors.lightgrey)
    c.drawCentredString(width / 2, 50, "www.shivcosmic.com")

    c.save()
    packet.seek(0)
    return packet

def generate_end_page() -> io.BytesIO:
    """
    Generates or loads the end page PDF.
    """
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=A4)
    width, height = A4
    
    # Draw Background
    print(f"[DEBUG] Looking for End BG at: {END_BG}")
    if os.path.exists(END_BG):
        print(f"[DEBUG] FOUND End BG. Drawing image...")
        try:
            c.drawImage(END_BG, 0, 0, width=width, height=height)
        except Exception as e:
            print(f"[ERROR] Failed to draw end image: {e}")
            c.setFillColorRGB(0.1, 0, 0)
            c.rect(0, 0, width, height, fill=1)
    else:
        print(f"[DEBUG] End BG NOT FOUND at {END_BG}")
        # Fallback
        c.setFillColorRGB(0.1, 0, 0)
        c.rect(0, 0, width, height, fill=1)
        
        # Contact Info
        c.setFillColor(colors.gold)
        c.setFont(DEFAULT_FONT, 32) # Big impact
        c.drawCentredString(width / 2, height / 2 + 20, "Thank You")
        
        c.setFillColor(colors.white)
        c.setFont(DEFAULT_FONT, 18) # Readable on mobile
        c.drawCentredString(width / 2, height / 2 - 40, "Dr. Shivsharan Manshetti")
        c.drawCentredString(width / 2, height / 2 - 70, "Vastu Shastra and Astrologer")
        
        c.setFont(DEFAULT_FONT, 16)
        c.drawCentredString(width / 2, 100, "info.shivcosmic@gmail.com")
        c.drawCentredString(width / 2, 70, "www.shivcosmic.com")
        
    c.save()
    packet.seek(0)
    return packet

async def merge_report_with_branding(report_url: str, name: str, dob: str) -> io.BytesIO:
    """
    Downloads the API report, generates cover/end pages, and merges them.
    Returns the merged PDF as bytes.
    """
    print(f"Merging PDF for {name}...")
    try:
        output = io.BytesIO()
        writer = PdfWriter()
    
        # 1. Generate Cover
        cover_stream = generate_cover_page(name, dob)
        cover_pdf = PdfReader(cover_stream)
        writer.add_page(cover_pdf.pages[0])
        
        # 2. Fetch and Add Report Pages
        async with httpx.AsyncClient() as client:
            response = await client.get(report_url)
            response.raise_for_status()
            report_stream = io.BytesIO(response.content)
            report_pdf = PdfReader(report_stream)
            
            # Exclude the last 4 pages (Ads/Upsells)
            # Assuming the reported ads are always at the end.
            pages_to_keep = len(report_pdf.pages) - 4
            if pages_to_keep < 1:
                pages_to_keep = len(report_pdf.pages) # Safety: don't remove everything if report is short
                
            for i in range(pages_to_keep):
                writer.add_page(report_pdf.pages[i])
                
        # 3. Generate and Add End Page
        end_stream = generate_end_page()
        end_pdf = PdfReader(end_stream)
        writer.add_page(end_pdf.pages[0])
    
        # 4. Write to Output
        writer.write(output)
        output.seek(0)
        print("PDF Merge Successful!")
        return output
    except Exception as e:
        print(f"Error inside merge_report_with_branding: {e}")
        import traceback
        traceback.print_exc()
        raise e
