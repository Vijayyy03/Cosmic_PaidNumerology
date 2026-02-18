"""
Google Sheets integration for storing numerology report data.
"""

import os
from datetime import datetime
from typing import Optional

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


class GoogleSheetsClient:
    """Client for interacting with Google Sheets API."""
    
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    
    def __init__(self, credentials_file: str, spreadsheet_id: str):
        """
        Initialize Google Sheets client.
        
        Args:
            credentials_file: Path to service account credentials JSON
            spreadsheet_id: ID of the Google Spreadsheet
        """
        self.spreadsheet_id = spreadsheet_id
        self.service = None
        
        if os.path.exists(credentials_file):
            try:
                credentials = service_account.Credentials.from_service_account_file(
                    credentials_file, 
                    scopes=self.SCOPES
                )
                self.service = build('sheets', 'v4', credentials=credentials)
                print("[SUCCESS] Google Sheets client initialized from File")
            except Exception as e:
                print(f"[WARN] Failed to initialize Google Sheets from File: {e}")
        else:
            # Try to load from Environment Variables
            private_key = os.getenv("GOOGLE_PRIVATE_KEY")
            client_email = os.getenv("GOOGLE_SERVICE_ACCOUNT_EMAIL")
            
            if private_key and client_email:
                try:
                    # Handle newline characters in private key string
                    if "\\n" in private_key:
                        private_key = private_key.replace("\\n", "\n")
                        
                    # Construct credentials info dict
                    creds_info = {
                        "type": "service_account",
                        "project_id": "numerology-backend", # Fallback, not critical for auth usually
                        "private_key": private_key,
                        "client_email": client_email,
                        "token_uri": "https://oauth2.googleapis.com/token",
                    }
                    
                    credentials = service_account.Credentials.from_service_account_info(
                        creds_info, 
                        scopes=self.SCOPES
                    )
                    self.service = build('sheets', 'v4', credentials=credentials)
                    print("[SUCCESS] Google Sheets client initialized from Environment Variables")
                except Exception as e:
                    print(f"[ERROR] Failed to initialize Google Sheets from Env Vars: {e}")
            else:
                print(f"[WARN] Credentials file not found and Env Vars missing.")
    
    def is_connected(self) -> bool:
        """Check if the client is connected to Google Sheets."""
        return self.service is not None
    
    def append_report_data(
        self,
        name: str,
        gender: str,
        dob: str,
        email: str,
        mobile: str,
        language: str,
        status: str = "Generated",
        coupon_code: str = ""
    ) -> Optional[dict]:
        """
        Append a new row of report data to the spreadsheet.
        """
        if not self.is_connected():
            print("[WARN] Google Sheets not connected, skipping data storage")
            return None
        
        try:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # Row data matching the sheet structure EXACTLY (based on user request)
            # Timestamp, Name, Gender, DOB, Email, Mobile, Language, Status, Coupon Code
            row_data = [
                timestamp,
                name,
                gender,
                dob,
                email,
                mobile,
                language,
                status,
                coupon_code
            ]
            
            body = {
                'values': [row_data]
            }
            
            result = self.service.spreadsheets().values().append(
                spreadsheetId=self.spreadsheet_id,
                range='Sheet1!A:I',  # A to I covers the 9 columns
                valueInputOption='RAW',
                body=body
            ).execute()
            
            print(f"[SUCCESS] Data appended to Google Sheet: {result.get('updates', {}).get('updatedCells', 0)} cells")
            return result
            
        except HttpError as e:
            print(f"[ERROR] Google Sheets API error: {e}")
            return None
        except Exception as e:
            print(f"[ERROR] Error appending to sheet: {e}")
            return None
    
    def setup_sheet_headers(self) -> Optional[dict]:
        """
        Set up headers in the spreadsheet if the first row is empty.
        Call this once during initial setup.
        """
        if not self.is_connected():
            return None
        
        headers = [
            "Timestamp",
            "Name", 
            "Gender",
            "DOB",
            "Email",
            "Mobile",
            "Language",
            "Status",
            "Coupon Code"
        ]
        
        try:
            # Check if first row is empty
            result = self.service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Sheet1!A1:I1'
            ).execute()
            
            values = result.get('values', [])
            
            if not values or not values[0]:
                # Add headers
                body = {'values': [headers]}
                result = self.service.spreadsheets().values().update(
                    spreadsheetId=self.spreadsheet_id,
                    range='Sheet1!A1:I1',
                    valueInputOption='RAW',
                    body=body
                ).execute()
                print("[SUCCESS] Sheet headers set up successfully")
                return result
            else:
                print("[INFO] Headers already exist")
                return None
                
        except Exception as e:
            print(f"[ERROR] Error setting up headers: {e}")
            return None


# Singleton instance (initialized in main.py)
sheets_client: Optional[GoogleSheetsClient] = None


def get_sheets_client() -> Optional[GoogleSheetsClient]:
    """Get the global Google Sheets client instance."""
    return sheets_client


def init_sheets_client(credentials_file: str, spreadsheet_id: str) -> GoogleSheetsClient:
    """Initialize and return the global Google Sheets client."""
    global sheets_client
    sheets_client = GoogleSheetsClient(credentials_file, spreadsheet_id)
    return sheets_client
