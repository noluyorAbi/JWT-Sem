import base64
import json
import hmac
import hashlib

def base64url_encode(input_str):
    message_bytes = input_str.encode('utf-8')
    base64_bytes = base64.urlsafe_b64encode(message_bytes)
    base64_str = base64_bytes.decode('utf-8')
    return base64_str.rstrip("=")

def encode_json_to_base64url(json_obj):
    json_str = json.dumps(json_obj, separators=(',', ':'))
    base64url_str = base64url_encode(json_str)
    return base64url_str

def create_signature(header_encoded, payload_encoded, secret):
    signature_data = f"{header_encoded}.{payload_encoded}".encode('utf-8')
    print("\nSignature Data:", signature_data)
    secret_bytes = secret.encode('utf-8')
    signature = hmac.new(secret_bytes, signature_data, hashlib.sha256).digest()
    print("Generated Signature (raw):", signature)
    signature_base64url = base64.urlsafe_b64encode(signature).decode('utf-8').rstrip("=")
    print("Generated Signature (encoded):", signature_base64url)
    return signature_base64url

def encode_jwt(header, payload, secret):
    header_encoded = encode_json_to_base64url(header)
    payload_encoded = encode_json_to_base64url(payload)
    
    if header['alg'] == 'none':
        signature_encoded = ''
    else:
        signature_encoded = create_signature(header_encoded, payload_encoded, secret)
    
    jwt_parts = [header_encoded, payload_encoded, signature_encoded]
    return '.'.join(jwt_parts)

if __name__ == "__main__":
    header = {
        "alg": "HS256", # This is the algorithm used for signing the JWT can be set to "none" for no signature
        "typ": "JWT"
    }
    
    payload = {
        "sub": "123456",
        "nam": "SoftwareSecurity",
        "iat": 1719007717
    }
    
    secret = "secret" # This is the secret key used for signing the JWT this should be kept secret and be a hard to guess random string
    
    jwt_encoded = encode_jwt(header, payload, secret.strip())
    print("\nJWT Encoded:")
    print(jwt_encoded)