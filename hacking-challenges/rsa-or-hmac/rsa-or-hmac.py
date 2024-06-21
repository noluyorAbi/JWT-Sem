import requests
import jwt

response = requests.get('https://web.cryptohack.org/rsa-or-hmac/get_pubkey/')
public_key = response.json()['pubkey']
print(public_key)

payload = {
    'username': 'admin',
    'admin': True
}

# Create the JWT with HS256
encoded_jwt = jwt.encode(payload, public_key, algorithm='HS256')
print(encoded_jwt)