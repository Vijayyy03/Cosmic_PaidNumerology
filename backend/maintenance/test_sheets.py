import os
from dotenv import load_dotenv
from app.sheets import init_sheets_client

# Load environment variables
load_dotenv()

def test_sheet_connection():
    print("--- Testing Google Sheets Connection ---")
    
    creds_file = os.getenv("GOOGLE_SHEETS_CREDENTIALS_FILE", "credentials.json")
    sheet_id = os.getenv("GOOGLE_SHEET_ID")
    
    print(f"Sheet ID from .env: {sheet_id}")
    
    if not sheet_id:
        print("❌ Error: GOOGLE_SHEET_ID is missing in .env")
        return

    try:
        # Initialize Client
        client = init_sheets_client(creds_file, sheet_id)
        
        if client.is_connected():
            print("✅ Client initialized successfully.")
            
            # Try to connect (Head request)
            client.setup_sheet_headers()
            print("✅ Specific Sheet accessed & Headers checked.")
            
            # Try to append a test row
            print("Attempting to append test data...")
            result = client.append_report_data(
                name="Test User",
                gender="Other",
                dob="01-01-2000",
                email="test@example.com",
                mobile="1234567890",
                language="English",
                status="TEST_ENTRY"
            )
            
            if result:
                print("✅ TEST PASSED: Row appended successfully!")
            else:
                print("❌ TEST FAILED: Could not append row.")
        else:
            print("❌ TEST FAILED: Client could not connect (Auth failed).")
            
    except Exception as e:
        print(f"❌ FATAL ERROR: {e}")

if __name__ == "__main__":
    test_sheet_connection()
