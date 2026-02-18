import os
import requests
import base64
from dotenv import load_dotenv

# Load env vars
load_dotenv()

USER_ID = os.getenv("ASTROLOGY_USER_ID", "616659")
API_KEY = os.getenv("ASTROLOGY_API_KEY", "0a9bf90337d14972e821a590d761404611abd507")
BASE_URL = "https://pdf.astrologyapi.com/v1"

def test_language(lang_code):
    print(f"\n--- Testing Language: {lang_code} ---")
    
    auth_str = f"{USER_ID}:{API_KEY}"
    encoded_auth = base64.b64encode(auth_str.encode()).decode()
    headers = {
        "Authorization": f"Basic {encoded_auth}",
        "Content-Type": "application/json"
    }
    
    endpoint = "/pro_numerology_report"
    url = f"{BASE_URL}{endpoint}"
    
    payload = {
        "name": f"Test {lang_code}",
        "gender": "male",
        "day": 1,
        "month": 1,
        "year": 1990,
        "hour": 12,
        "min": 0,
        "lat": 28.6,
        "lon": 77.2,
        "tzone": 5.5,
        "place": "Delhi",
        "language": lang_code
    }
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("Response Keys:", data.keys())
            if 'pdf_url' in data:
                print(f"PDF URL: {data['pdf_url']}")
                # We can't easily verify the *content* language without downloading and reading,
                # but getting a different URL for different params usually indicates success.
            elif 'response' in data:
                 print(f"PDF URL: {data['response'].get('pdf_url')}")
            else:
                print("No PDF URL found.")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_language("en")
    test_language("hi") 
    test_language("mr")
