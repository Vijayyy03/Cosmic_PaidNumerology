import requests
import json

def test_backend():
    url = "http://localhost:8001/api/numerology/generate"
    
    payload = {
        "name": "Backend Test Hindi",
        "dob": "15-08-1990",
        "gender": "Male",
        "language": "Hindi"  # Known working language
    }
    
    print(f"Sending POST to {url} with payload: {payload}")
    
    try:
        response = requests.post(url, json=payload, timeout=60)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("Response:", json.dumps(data, indent=2))
            
            # Check if PDF URL is returned
            pdf_url = data.get("pdf_url")
            if pdf_url:
                print(f"Success! PDF generated at: {pdf_url}")
                # We can try to download it to verify content hash if needed
            else:
                print("Error: No PDF URL in response.")
        else:
            print("Error Response:", response.text)
            
    except Exception as e:
        print(f"Connection Error: {e}")
        print("Make sure the uvicorn server is running on port 8001!")

if __name__ == "__main__":
    test_backend()
