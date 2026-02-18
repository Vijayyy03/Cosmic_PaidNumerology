
import os
import sys
import io
import asyncio
# Add backend to path so we can import app paths
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.pdf_utils import ASSETS_DIR, COVER_BG, END_BG, merge_report_with_branding

async def test_merge():
    print(f"--- DIAGNOSTICS ---")
    print(f"CWD: {os.getcwd()}")
    print(f"ASSETS_DIR: {ASSETS_DIR}")
    print(f"COVER_BG: {COVER_BG} (Exists: {os.path.exists(COVER_BG)})")
    print(f"END_BG: {END_BG} (Exists: {os.path.exists(END_BG)})")
    
    # Dummy PDF URL (or use a local file if you have one, but for now we test network + merge)
    # Using a sample PDF from W3C or similar, or just a known astrology PDF if we had one.
    # Since we don't want to rely on external uptime, let's Mock the network call or use a simple one.
    # We will use the 'generate_cover_page' to make a dummy "report" PDF locally to merge with.
    
    print("\n--- GENERATING MOCK REPORT ---")
    from app.pdf_utils import generate_cover_page
    mock_report_stream = generate_cover_page("MOCK REPORT CONTENT", "01-01-2000")
    
    # Save it temporarily
    with open("mock_report.pdf", "wb") as f:
        f.write(mock_report_stream.getvalue())
    mock_report_path = os.path.abspath("mock_report.pdf")
    mock_report_url = f"file:///{mock_report_path}" # httpx usually strictly wants http, so we might need to mock httpx
    
    print(f"Mock Report Created at: {mock_report_path}")

    # We need to MonkeyPatch httpx to return our local file bytes instead of calling internet
    # because 'file://' isn't supported by httpx out of the box usually.
    # Actually, let's just modify the merge function signature for testing or mock the client.
    
    print("\n--- STARTING MERGE TEST ---")
    try:
        # We will wrap the original function to mock the network call
        # But 'merge_report_with_branding' takes a URL.
        # Let's try to pass a real URL if possible, or just fail at network step but verify assets first.
        # Actually, let's just try to call it. if it fails at network, that's fine, we want to see asset failure first.
        
        # Real PDF URL that failed in production
        # We need to test if httpx can fetch this specific S3 URL
        test_url = "https://s3.ap-south-1.amazonaws.com/pdfapilambda/1c0e94b0-c260-445f-8f4c-f1eb316089dd.pdf"
        
        print(f"Testing URL: {test_url}")
        
        result = await merge_report_with_branding(test_url, "TEST USER", "01-01-1990")
        
        with open("debug_output.pdf", "wb") as f:
            f.write(result.getvalue())
            
        print("\nSUCCESS! 'debug_output.pdf' created.")
        
    except Exception as e:
        print(f"\nFATAL ERROR DURING MERGE:")
        print(f"{e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_merge())
