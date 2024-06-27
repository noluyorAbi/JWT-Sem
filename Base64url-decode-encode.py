import base64
import re

def base64url_encode(data):
    """
    Encodes data to Base64URL.
    
    :param data: Bytes to encode.
    :return: Base64URL encoded string.
    """
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')

def base64url_decode(data):
    """
    Decodes Base64URL data.
    
    :param data: Base64URL encoded string.
    :return: Decoded bytes.
    """
    padding = '=' * (4 - len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)

def is_base64url(s):
    """
    Checks if the given string is Base64URL encoded.
    
    :param s: String to check.
    :return: True if the string is Base64URL encoded, False otherwise.
    """
    base64url_pattern = re.compile(r'^[A-Za-z0-9\-_]+$')
    return bool(base64url_pattern.match(s))

if __name__ == "__main__":
    user_input = input("Enter text to encode or Base64URL to decode: ")

    if is_base64url(user_input):
        try:
            decoded_data = base64url_decode(user_input)
            # Try decoding to UTF-8, but handle the case where it isn't valid UTF-8
            try:
                print(f"Decoded: {decoded_data.decode('utf-8')}")
            except UnicodeDecodeError:
                # If it can't be decoded as UTF-8, show as hexadecimal
                print(f"Decoded (hex): {decoded_data.hex()}")
        except Exception as e:
            print(f"Error decoding Base64URL: {e}")
    else:
        encoded_data = base64url_encode(user_input.encode('utf-8'))
        print(f"Encoded: {encoded_data}")
