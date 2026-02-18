import os
import requests
import base64
from typing import Dict, Any, Optional

class AstrologyAPIClient:
    def __init__(self, user_id: str, api_key: str):
        self.base_url = "https://pdf.astrologyapi.com/v1"
        self.user_id = user_id
        self.api_key = api_key
        
        # Prepare Auth Header
        auth_str = f"{user_id}:{api_key}"
        encoded_auth = base64.b64encode(auth_str.encode()).decode()
        self.headers = {
            "Authorization": f"Basic {encoded_auth}",
            "Content-Type": "application/json"
        }

    def get_numerology_report_pdf(self, name: str, dob_dt: str, gender: str, language: str = "en") -> Dict[str, Any]:
        """
        Generates a Numerology PDF report using the 'pro_numerology_report' endpoint.
        This is the dedicated endpoint for the user's plan.
        """
        # Parse DD-MM-YYYY
        try:
            day, month, year = map(int, dob_dt.split('-'))
        except ValueError:
            raise ValueError("Invalid date format. Use DD-MM-YYYY")

        # Use the dedicated Numerology endpoint discovered from the dashboard
        endpoint = "/pro_numerology_report" 
        url = f"{self.base_url}{endpoint}"
        
        # Default Location: New Delhi (Standard fallback)
        # Even if not strictly required by Numerology logic, the API might validated it.
        lat = 28.6139
        lon = 77.2090
        tzone = 5.5
        place = "New Delhi, India"

        payload = {
            "name": name,
            "gender": gender.lower(),
            "day": day,
            "month": month,
            "year": year,
            "hour": 12,    # Noon default
            "min": 0,
            "lat": lat,
            "lon": lon,
            "tzone": tzone,
            "place": place,
            "language": language,
            "footer_link": "shivcosmic.com",
            "logo_url": "https://shivcosmic.com/logo.png"
        }
        
        try:
            # Increased timeout for PDF generation
            print(f"[DEBUG] Sending payload to AstrologyAPI: {payload}")
            response = requests.post(url, json=payload, headers=self.headers, timeout=120)
            
            if response.status_code == 200:
                data = response.json()
                # Check for nested response structure seen in test: {"response": {"pdf_url": ...}}
                if data.get('pdf_url'):
                    return {"pdf_url": data.get('pdf_url')}
                elif data.get('response') and data.get('response').get('pdf_url'):
                     return {"pdf_url": data.get('response').get('pdf_url')}
                else:
                    raise Exception(f"API Error: {data.get('message', 'Unknown Error')}")
            
            elif response.status_code == 405:
                raise Exception("API Plan Limitation: Pro Numerology Report is not authorized.")
            
            else:
                raise Exception(f"External API Error ({response.status_code}): {response.text}")
                
        except requests.RequestException as e:
             raise Exception(f"Connection Error: {str(e)}")

