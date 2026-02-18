
import requests
import json

url = "http://localhost:8001/api/numerology/generate"
payload = {
    "name": "Debug User",
    "gender": "male",
    "dob": "10-03-2003",
    "language": "en"
}

try:
    print(f"Sending request to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Failed to connect: {e}")
