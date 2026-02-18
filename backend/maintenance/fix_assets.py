import shutil
import os
import sys

# Define Code Paths
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BACKEND_DIR, "assets")
FRONTEND_IMAGES_DIR = os.path.join(BACKEND_DIR, "..", "frontend", "public", "images")

# Define Source and Destination
COVER_SOURCE = os.path.join(FRONTEND_IMAGES_DIR, "Numerology_Banner.jpg")
COVER_DEST = os.path.join(ASSETS_DIR, "cover_bg.jpg")

# For End Page, we'll mistakenly reuse the banner if no specific end page exists, 
# or check if there is an 'end_bg.jpg' in frontend. 
# Based on file listing, there isn't. So we will use Numerology_Banner for now 
# or just ensure the existing one is valid if it exists.
# User said "banner and end page still gives issue". 
# If end page is "old purple", it might be the fallback color in pdf_utils.py (Dark Red/Black 0.1,0,0).
# Let's try to copy the banner to end_bg as well for consistency if no other file exists.
END_DEST = os.path.join(ASSETS_DIR, "end_bg.jpg")

def fix_assets():
    print(f"Fixing assets in {ASSETS_DIR}...")
    
    if not os.path.exists(ASSETS_DIR):
        os.makedirs(ASSETS_DIR)
        print(f"Created directory: {ASSETS_DIR}")

    # 1. Fix Cover Page
    if os.path.exists(COVER_SOURCE):
        try:
            shutil.copy2(COVER_SOURCE, COVER_DEST)
            print(f"[SUCCESS] Copied {COVER_SOURCE} -> {COVER_DEST}")
            print(f"New Size: {os.path.getsize(COVER_DEST)} bytes")
        except Exception as e:
            print(f"[ERROR] Failed to copy cover: {e}")
    else:
        print(f"[ERROR] Source file not found: {COVER_SOURCE}")

    # 2. Fix End Page
    # If the user wants the same theme, we can use the same banner or a specific file.
    # Let's simply duplicate the banner for now to PROVE we can change it.
    if os.path.exists(COVER_SOURCE):
        try:
            shutil.copy2(COVER_SOURCE, END_DEST)
            print(f"[SUCCESS] Copied {COVER_SOURCE} -> {END_DEST} (Using Banner as End Page temporarily)")
        except Exception as e:
            print(f"[ERROR] Failed to copy end page: {e}")
            
    # 3. Verify
    print("\n--- Verification ---")
    print(f"Cover Exists: {os.path.exists(COVER_DEST)}")
    print(f"End Page Exists: {os.path.exists(END_DEST)}")

if __name__ == "__main__":
    fix_assets()
