import requests
import base64
import json

# User Credentials
USER_ID = "4545"
API_KEY = "ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY"

# Base URL for PDF API
BASE_URL = "https://pdf.astrologyapi.com/v1"

# Auth Header
auth_str = f"{USER_ID}:{API_KEY}"
encoded_auth = base64.b64encode(auth_str.encode()).decode()
headers = {
    "Authorization": f"Basic {encoded_auth}",
    "Content-Type": "application/json"
}

def test_endpoint(name, endpoint, data):
    print(f"\n--- Testing {name} ---")
    url = f"{BASE_URL}/{endpoint}"
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("SUCCESS: API Key is VALID and AUTHORIZED for this feature.")
            print(f"Response Snippet: {response.text[:100]}...")
        elif response.status_code == 405:
            print("FAILED: API Key is VALID but NOT AUTHORIZED (Plan Limit).")
            print(f"Server Message: {response.text}")
        elif response.status_code == 401:
            print("FAILED: API Key is INVALID (Authentication failed).")
            print(f"Response: {response.text}")
        elif response.status_code == 404:
             print("FAILED: Endpoint not found (404).")
        else:
            print(f"ERROR: Unexpected status code {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

# 1. Test Basic Horoscope (Should WORK if key is valid)
horoscope_data = {
    "name": "Test User",
    "day": 25, "month": 12, "year": 1990,
    "hour": 10, "min": 0,
    "lat": 19.07, "lon": 72.87, "tzone": 5.5
}
test_endpoint("Basic Horoscope PDF", "basic_horoscope_pdf", horoscope_data)

# 2. Test Numerology (The goal)
numerology_data = {
    "name": "Test User",
    "day": 25, "month": 12, "year": 1990,
    "gender": "male"
}
test_endpoint("Numerology PDF", "basic_numerology_pdf", numerology_data)
