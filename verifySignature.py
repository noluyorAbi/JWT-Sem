import base64
import json
import hmac
import hashlib

def urlsafe_b64decode(input):
    input = input + '=' * (4 - len(input) % 4)
    return base64.urlsafe_b64decode(input)

def urlsafe_b64encode(input):
    return base64.urlsafe_b64encode(input).rstrip(b'=')

def verify_jwt(token, secret):
    parts = token.split('.')
    if len(parts) != 3:
        print("Invalid JWT structure.")
        return False
    
    header, payload, signature = parts
    
    header_json = urlsafe_b64decode(header).decode('utf-8')
    payload_json = urlsafe_b64decode(payload).decode('utf-8')
    
    header_data = json.loads(header_json)
    payload_data = json.loads(payload_json)
    
    if header_data.get("alg") == "none":
        print("This JWT has no Signature")
        print("Header:", json.dumps(header_data, indent=2))
        print("Payload:", json.dumps(payload_data, indent=2))
        return True
    
    signature_decoded = urlsafe_b64decode(signature)
    
    signing_input = f'{header}.{payload}'
    expected_signature = hmac.new(secret.encode(), signing_input.encode(), hashlib.sha256).digest()
    
    print("\nSigning Input:", signing_input.encode('utf-8'))
    print("Expected Signature (raw):", expected_signature)
    print("Expected Signature (encoded):", base64.urlsafe_b64encode(expected_signature).decode('utf-8').rstrip("="))
    print("Given Signature (encoded):", signature)
    
    if hmac.compare_digest(signature_decoded, expected_signature):
        print("\nJWT verification successful!")
    else:
        print("\nJWT verification failed.")
    
    print("Header:", json.dumps(header_data, indent=2))
    print("Payload:", json.dumps(payload_data, indent=2))
    
    return hmac.compare_digest(signature_decoded, expected_signature)

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW0iOiJTb2Z0d2FyZVNlY3VyaXR5IiwiaWF0IjoxNzE5MDA3NzE3fQ.OclYf6r6KhohbRISQCN1TTyPyin5BUpJajnkIBLWSRA" # input your token here
secret = 'secret'

verify_jwt(token, secret)