
from app.pdf_utils import generate_cover_page
import os

print("Testing Cover Page Generation...")
try:
    pdf_buffer = generate_cover_page("Test User", "10-03-2003")
    with open("test_cover.pdf", "wb") as f:
        f.write(pdf_buffer.getvalue())
    print("Success: test_cover.pdf generated.")
    print(f"Size: {os.path.getsize('test_cover.pdf')} bytes")
except Exception as e:
    print(f"Failed: {e}")
