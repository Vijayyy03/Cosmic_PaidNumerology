import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Load env vars
load_dotenv()

def test_email():
    print("--- Testing Email Service ---")
    
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    print(f"Host: {smtp_host}:{smtp_port}")
    print(f"User: {smtp_user}")
    
    if not smtp_password:
        print("❌ Error: SMTP_PASSWORD is missing.")
        return

    try:
        # Create a simple message
        msg = MIMEText("This is a test email from your Numerology Backend.\n\nIf you see this, email sending is WORKING! ✅")
        msg['Subject'] = "Test Email - Cosmic Numerology"
        msg['From'] = f"Shiv Cosmic <{smtp_user}>"
        msg['To'] = smtp_user # Send to self
        
        # Connect
        print("Connecting to SMTP server...")
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        
        print("Logging in...")
        server.login(smtp_user, smtp_password)
        
        print("Sending email...")
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email sent successfully to {smtp_user}")
        
    except Exception as e:
        print(f"❌ Email Sending Failed: {e}")

if __name__ == "__main__":
    test_email()
