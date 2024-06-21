import requests

response = requests.get("https://web.cryptohack.org/rsa-or-hmac/get_pubkey/")
public_key = response.json()["pubkey"]
print(public_key)