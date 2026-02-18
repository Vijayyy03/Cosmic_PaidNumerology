import os
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
COVER_BG = os.path.join(ASSETS_DIR, "cover_bg.jpg")
OUTPUT_FILE = os.path.join(BASE_DIR, "test_asset_render.pdf")

def test_render():
    print(f"Testing render of: {COVER_BG}")
    if not os.path.exists(COVER_BG):
        print("ERROR: File does not exist!")
        return

    try:
        print(f"File size: {os.path.getsize(COVER_BG)} bytes")
        
        c = canvas.Canvas(OUTPUT_FILE, pagesize=A4)
        width, height = A4
        
        # Try drawing
        c.drawImage(COVER_BG, 0, 0, width=width, height=height)
        
        # Draw some text on top to be sure
        c.setFont("Helvetica", 50)
        c.drawString(100, 500, "TEST RENDER")
        
        c.save()
        print(f"Success! Created {OUTPUT_FILE}")
        
    except Exception as e:
        print(f"CRITICAL ERROR generating PDF: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_render()
