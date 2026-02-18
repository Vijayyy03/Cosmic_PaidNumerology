
import requests
import json
import base64

# Testing newly discovered endpoint from user screenshot
base_url = "https://pdf.astrologyapi.com/v1"

# Auth Working for Horoscope (Basic Auth) - Creds 1
user_id = "616659"
api_key = "0a9bf90337d14972e821a590d761404611abd507"

auth_str = f"{user_id}:{api_key}"
encoded_auth = base64.b64encode(auth_str.encode()).decode()
headers = {
    "Authorization": f"Basic {encoded_auth}",
    "Content-Type": "application/json"
}

endpoints_to_test = [
    # Exact name from screenshot
    "pro_numerology_report",
    # Common variations just in case
    "pro_numerology_report_pdf",
]

# Payload (Standard Numerology params + Location just in case)
data_json = {
    "name": "John Doe",
    "gender": "male",
    "day": 25,
    "month": 12,
    "year": 1990,
    "hour": 10,
    "min": 0,
    "lat": 19.07,
    "lon": 72.87,
    "tzone": 5.5,
    "place": "Mumbai, India",
    "language": "en",
    "footer_link": "shivcosmic.com",
    "logo_url": "https://shivcosmic.com/logo.png"
}

print(f"Testing 'pro_numerology_report' for User {user_id}...")

for endpoint in endpoints_to_test:
    url = f"{base_url}/{endpoint}"
    try:
        response = requests.post(url, json=data_json, headers=headers, timeout=20)
        print(f"Testing {endpoint}: {response.status_code}")
        
        if response.status_code == 200:
             print(f"!!! SUCCESS: {endpoint}")
             print(json.dumps(response.json(), indent=2))
        else:
             print(f"FAILED {endpoint}: {response.status_code}")
             print(response.text[:500])
             
    except Exception as e:
        print(f"Error {endpoint}: {e}")


