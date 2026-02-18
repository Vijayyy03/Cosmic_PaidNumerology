import os
import requests
import hashlib
from dotenv import load_dotenv
from app.astrology_client import AstrologyAPIClient

load_dotenv()

def get_file_hash(content):
    return hashlib.md5(content).hexdigest()

def compare_languages():
    print("--- Comparing English vs Marathi API Responses ---")
    
    user_id = os.getenv("ASTROLOGY_USER_ID", "616659")
    api_key = os.getenv("ASTROLOGY_API_KEY", "0a9bf90337d14972e821a590d761404611abd507")
    client = AstrologyAPIClient(user_id, api_key)
    
    # Common details
    name = "Language Test"
    dob = "01-01-1990"
    gender = "male"
    
    # 1. Fetch English
    print("\nFetching English Report...")
    res_en = client.get_numerology_report_pdf(name, dob, gender, language="en")
    url_en = res_en.get("pdf_url")
    print(f"English URL: {url_en}")
    content_en = requests.get(url_en).content
    hash_en = get_file_hash(content_en)
    print(f"English File Size: {len(content_en)} bytes")
    print(f"English File Hash: {hash_en}")
    
    # 2. Fetch Marathi (using 'mar')
    print("\nFetching Marathi Report (code='mar')...")
    res_mar = client.get_numerology_report_pdf(name, dob, gender, language="mar")
    url_mar = res_mar.get("pdf_url")
    print(f"Marathi URL: {url_mar}")
    content_mar = requests.get(url_mar).content
    hash_mar = get_file_hash(content_mar)
    print(f"Marathi File Size: {len(content_mar)} bytes")
    print(f"Marathi File Hash: {hash_mar}")
    
    # 3. Compare
    print("\n--- RESULTS ---")
    if hash_en == hash_mar:
        print("❌ FAILURE: The API returned IDENTICAL files for English and Marathi.")
        print("Conclusion: The External API is IGNORING the language parameter for this endpoint.")
    else:
        print("✅ SUCCESS: The API returned DIFFERENT files.")
        print("Conclusion: The API is attempting to generate different content.")
        
        # Save files for manual inspection
        with open("test_en.pdf", "wb") as f: f.write(content_en)
        with open("test_mar.pdf", "wb") as f: f.write(content_mar)
        print("Saved 'test_en.pdf' and 'test_mar.pdf' for inspection.")

if __name__ == "__main__":
    compare_languages()
