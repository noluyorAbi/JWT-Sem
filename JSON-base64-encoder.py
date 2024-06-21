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
    secret_bytes = secret.encode('utf-8')
    signature = hmac.new(secret_bytes, signature_data, hashlib.sha256).digest()
    signature_base64url = base64.urlsafe_b64encode(signature).decode('utf-8').rstrip("=")
    return signature_base64url

def encode_jwt(header, payload, secret):
    header_encoded = encode_json_to_base64url(header)
    payload_encoded = encode_json_to_base64url(payload)
    signature_encoded = create_signature(header_encoded, payload_encoded, secret)
    return f"{header_encoded}.{payload_encoded}.{signature_encoded}"

if __name__ == "__main__":
    header = {
    "typ": "JWT",
    "alg": "HS256"
}
    
    payload = {
        "username": "admin",
        "admin": True
    }
    
    
    secret = """
MIIBCgKCAQEAvoOtsfF5Gtkr2Swy0xzuUp5J3w8bJY5oF7TgDrkAhg1sFUEaCMlR
YltE8jobFTyPo5cciBHD7huZVHLtRqdhkmPD4FSlKaaX2DfzqyiZaPhZZT62w7Hi
gJlwG7M0xTUljQ6WBiIFW9By3amqYxyR2rOq8Y68ewN000VSFXy7FZjQ/CDA3wSl
Q4KI40YEHBNeCl6QWXWxBb8AvHo4lkJ5zZyNje+uxq8St1WlZ8/5v55eavshcfD1
0NSHaYIIilh9yic/xK4t20qvyZKe6Gpdw6vTyefw4+Hhp1gROwOrIa0X0alVepg9
Jddv6V/d/qjDRzpJIop9DSB8qcF1X23pkQIDAQAB
    """
    
    jwt_encoded = encode_jwt(header, payload, secret)
    print("JWT Encoded:")
    print(jwt_encoded)
