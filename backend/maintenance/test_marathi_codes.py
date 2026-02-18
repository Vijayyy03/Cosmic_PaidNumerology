import os
import requests
import base64
from dotenv import load_dotenv

load_dotenv()

USER_ID = os.getenv("ASTROLOGY_USER_ID", "616659")
API_KEY = os.getenv("ASTROLOGY_API_KEY", "0a9bf90337d14972e821a590d761404611abd507")
BASE_URL = "https://pdf.astrologyapi.com/v1"

def test_code(lang_code):
    print(f"\n--- Testing Code: '{lang_code}' ---")
    auth_str = f"{USER_ID}:{API_KEY}"
    encoded_auth = base64.b64encode(auth_str.encode()).decode()
    headers = {
        "Authorization": f"Basic {encoded_auth}",
        "Content-Type": "application/json"
    }
    
    url = f"{BASE_URL}/pro_numerology_report"
    payload = {
        "name": f"Test {lang_code}",
        "gender": "male",
        "day": 10,
        "month": 5,
        "year": 1995,
        "hour": 12,
        "min": 0,
        "lat": 18.5204, # Pune
        "lon": 73.8567,
        "tzone": 5.5,
        "place": "Pune",
        "language": lang_code
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            pdf_url = data.get('pdf_url') or data.get('response', {}).get('pdf_url')
            print(f"PDF URL: {pdf_url}")
            # We can't verify content, but we can verify if it accepts the code.
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # Test valid and potentially valid Marathi codes
    test_code("mr")      # Standard ISO
    test_code("mar")     # ISO 3-letter
    test_code("Marathi") # Full name
    test_code("ma")      # Uncommon
