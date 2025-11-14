from flask import Flask, request, jsonify, send_from_directory
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

app = Flask(__name__, static_folder='static')

# Email configuration - using environment variables
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_email(name, email, message):
    try:
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
        
        ---
        This message was sent from your portfolio contact form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, "attorneyvalois@gmail.com", text)
        server.quit()
        
        print(f"Email sent successfully to attorneyvalois@gmail.com")
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

# Serve the main page
@app.route('/')
def serve_index():
    return send_from_directory('static', 'index.html')

# Serve static files
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No data received'}), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        print(f"Received message from: {name} ({email})")
        
        if not name or not email or not message:
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        if not is_valid_email(email):
            return jsonify({'success': False, 'message': 'Please enter a valid email address'}), 400
        
        if len(message) < 10:
            return jsonify({'success': False, 'message': 'Message must be at least 10 characters long'}), 400
        
        if send_email(name, email, message):
            return jsonify({'success': True, 'message': 'Thank you for your message! I will get back to you soon.'}), 200
        else:
            return jsonify({'success': False, 'message': 'Failed to send message. Please try again later.'}), 500
            
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'success': False, 'message': 'An error occurred. Please try again.'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Server is running'}), 200

# Vercel requires this
if __name__ == '__main__':
    app.run(debug=True)
