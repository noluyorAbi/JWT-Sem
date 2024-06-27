import json
from jose import jwe
from jose.constants import ALGORITHMS

def create_jwe(payload, key):
    """
    Erzeugt eine JWE (JSON Web Encryption).

    :param payload: Das zu verschlüsselnde JSON-Payload.
    :param key: Der Schlüssel zum Verschlüsseln des Payloads.
    :return: Das verschlüsselte JWE.
    """
    # Sicherstellen, dass das Payload ein gültiges JSON-Objekt ist
    try:
        payload_json = json.loads(payload)
    except json.JSONDecodeError as e:
        raise ValueError("Das Payload ist kein gültiges JSON-Objekt.") from e

    # Verschlüsseln des Payloads
    encrypted_payload = jwe.encrypt(json.dumps(payload_json), key, algorithm=ALGORITHMS.A256KW, encryption=ALGORITHMS.A256GCM)
    return encrypted_payload

if __name__ == "__main__":
    # Beispielpayload
    payload = '{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'
    
    # Symmetrischer Schlüssel (32 Byte für A256KW)
    key = b'0123456789abcdef0123456789abcdef'
    
    # Erstellen des JWE
    encrypted_jwe = create_jwe(payload, key)
    
    print(f"Verschlüsseltes JWE: {encrypted_jwe}")
