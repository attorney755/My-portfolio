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

def handler(request, response):
    # Set CORS headers
    response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    
    if request.method == 'OPTIONS':
        return response.json({'status': 'ok'}, status=200)
    
    if request.method != 'POST':
        return response.json({'success': False, 'message': 'Method not allowed'}, status=405)
    
    try:
        data = request.json
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        print(f"Received: {name}, {email}, {message}")
        
        # Validation
        if not name or not email or not message:
            return response.json({
                'success': False, 
                'message': 'All fields are required'
            }, status=400)
            
        if not is_valid_email(email):
            return response.json({
                'success': False, 
                'message': 'Please enter a valid email address'
            }, status=400)
            
        if len(message) < 10:
            return response.json({
                'success': False, 
                'message': 'Message must be at least 10 characters long'
            }, status=400)
            
        # Send email
        if send_email(name, email, message):
            return response.json({
                'success': True, 
                'message': 'Thank you for your message! I will get back to you soon.'
            }, status=200)
        else:
            return response.json({
                'success': False, 
                'message': 'Failed to send message. Please try again later.'
            }, status=500)
            
    except Exception as e:
        print(f"Server error: {str(e)}")
        return response.json({
            'success': False, 
            'message': 'An error occurred. Please try again.'
        }, status=500)
