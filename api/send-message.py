from http.server import BaseHTTPRequestHandler
import smtplib
import os
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_email(name, email, message):
    try:
        SMTP_SERVER = "smtp.gmail.com"
        SMTP_PORT = 587
        EMAIL_ADDRESS = os.environ.get('EMAIL_ADDRESS')
        EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')
        
        if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
            print("Email credentials missing")
            return False
        
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = "attorneyvalois@gmail.com"
        msg['Subject'] = f"New Contact Form Message from {name}"
        
        body = f"""
        New message from your portfolio website:
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, "attorneyvalois@gmail.com", text)
        server.quit()
        
        print("Email sent successfully")
        return True
    except Exception as e:
        print(f"Email error: {str(e)}")
        return False

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        try:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            message = data.get('message', '').strip()
            
            print(f"Received: {name}, {email}, {message}")
            
            # Validation
            if not name or not email or not message:
                self.wfile.write(json.dumps({
                    'success': False, 
                    'message': 'All fields are required'
                }).encode())
                return
                
            if not is_valid_email(email):
                self.wfile.write(json.dumps({
                    'success': False, 
                    'message': 'Please enter a valid email address'
                }).encode())
                return
                
            if len(message) < 10:
                self.wfile.write(json.dumps({
                    'success': False, 
                    'message': 'Message must be at least 10 characters long'
                }).encode())
                return
                
            # Send email
            if send_email(name, email, message):
                self.wfile.write(json.dumps({
                    'success': True, 
                    'message': 'Thank you for your message! I will get back to you soon.'
                }).encode())
            else:
                self.wfile.write(json.dumps({
                    'success': False, 
                    'message': 'Failed to send message. Please try again later.'
                }).encode())
                
        except Exception as e:
            print(f"Server error: {str(e)}")
            self.wfile.write(json.dumps({
                'success': False, 
                'message': 'An error occurred. Please try again.'
            }).encode())

def main(request, response):
    return Handler()
