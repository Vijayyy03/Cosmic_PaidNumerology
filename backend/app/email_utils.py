import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

def send_email_with_report(to_email: str, subject: str, body: str, pdf_path: str):
    """
    Sends an email with the PDF report attached.
    Also sends a copy to the admin email (info.shivcosmic@gmail.com).
    """
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    admin_email = "info.shivcosmic@gmail.com"

    if not smtp_user or not smtp_password:
        print(f"[EMAIL SKIPPED] SMTP credentials not set. Report generated: {pdf_path}")
        return

    msg = MIMEMultipart()
    msg['From'] = f"Shiv Cosmic <{smtp_user}>"
    msg['To'] = to_email
    msg['Bcc'] = admin_email # Blind copy to admin
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    # Attach PDF
    try:
        with open(pdf_path, "rb") as f:
            part = MIMEApplication(f.read(), Name=os.path.basename(pdf_path))
        
        part['Content-Disposition'] = f'attachment; filename="{os.path.basename(pdf_path)}"'
        msg.attach(part)
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to attach PDF: {e}")
        return

    # Send
    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        # Send to both user and admin (handled by Bcc header usually, but explicit list needed for sendmail)
        recipients = [to_email, admin_email]
        server.sendmail(smtp_user, recipients, msg.as_string())
        server.quit()
        print(f"[EMAIL SENT] Report sent to {to_email} and {admin_email}")
    except Exception as e:
        print(f"[EMAIL FAILED] Could not send email: {e}")
