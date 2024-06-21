"""
Dieses Skript dekodiert einen JSON Web Token (JWT). Ein JWT besteht aus drei durch Punkte (.) getrennten Teilen: Header, Payload und Signature. 
Der Header und die Payload sind Base64Url-kodiert. Dieses Skript dekodiert diese Teile und gibt sie als JSON aus.

Funktionsweise:
1. base64url_decode: Diese Funktion dekodiert einen Base64Url-kodierten String.
2. decode_jwt: Diese Funktion nimmt ein JWT, teilt es in seine drei Teile (Header, Payload, Signature) und dekodiert die Header- und Payload-Teile.
3. Beispiel für die Verwendung: Das Skript dekodiert ein gegebenes JWT und gibt die dekodierten Header- und Payload-Daten aus.
"""

import base64  # Importiert die base64 Bibliothek für die Base64 Dekodierung
import json    # Importiert die json Bibliothek für das Arbeiten mit JSON Daten

def base64url_decode(input_str):  # Diese Funktion dekodiert einen Base64Url-kodierten String
    padding = '=' * (4 - (len(input_str) % 4))  # Fügt notwendige Padding-Zeichen hinzu
    return base64.urlsafe_b64decode(input_str + padding)  # Dekodiert den Base64Url String und gibt die Bytes zurück

def decode_jwt(token):  # Diese Funktion dekodiert einen JWT
    header, payload, signature = token.split('.')  # Teilt das JWT in seine drei Teile (Header, Payload, Signature)
    
    decoded_header = base64url_decode(header).decode('utf-8')  # Dekodiert den Header-Teil und wandelt ihn in einen String um
    decoded_payload = base64url_decode(payload).decode('utf-8')  # Dekodiert den Payload-Teil und wandelt ihn in einen String um
    
    header_json = json.loads(decoded_header)  # Wandelt den dekodierten Header-String in ein JSON-Objekt um
    payload_json = json.loads(decoded_payload)  # Wandelt den dekodierten Payload-String in ein JSON-Objekt um
    
    return header_json, payload_json  # Gibt die JSON-Objekte für Header und Payload zurück

# Beispiel für die Verwendung
if __name__ == "__main__":  # Hauptteil des Skripts, wird nur ausgeführt, wenn das Skript direkt aufgerufen wird
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6IkZhbHNlIiwidXNlcm5hbWUiOiJGb29CYXIifQ.PmyrmUlX2kMXS_a8nkTqjpG-Tb1sI_WU6ghjcy2x_iE"  # Beispiel JWT
    
    header, payload = decode_jwt(token)  # Dekodiert das Beispiel JWT
    print("Header:", json.dumps(header, indent=2))  # Gibt den dekodierten Header schön formatiert aus
    print("Payload:", json.dumps(payload, indent=2))  # Gibt den dekodierten Payload schön formatiert aus