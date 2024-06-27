import json

def jws_json_to_compact(jws_json):
    """
    Convert JWS JSON Serialization to compact JWT format.
    
    :param jws_json: JWS JSON Serialization
    :return: List of compact JWTs
    """
    compact_jwts = []
    payload = jws_json['payload']
    
    for signature in jws_json['signatures']:
        protected_header = signature['protected']
        sig = signature['signature']
        compact_jwt = f"{protected_header}.{payload}.{sig}"
        compact_jwts.append(compact_jwt)
    
    return compact_jwts

# Beispiel JWS JSON Serialization
jws_json_serialization = {
    "payload": "eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ",
    "signatures": [
      {
        "protected": "eyJhbGciOiJSUzI1NiJ9",
        "header": { "kid": "2010-12-29" },
        "signature": "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO5vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw"
      },
      {
        "protected": "eyJhbGciOiJFUzI1NiJ9",
        "header": { "kid": "e9bc097a-ce51-4036-9562-d2ade882db0d" },
        "signature": "DtEhU3ljbEg8L38VWAfUAqOyKAM6-Xx-F4GawxaepmXFCgfTjDxw5djxLa8ISlSApmWQxfKTUJqPP3-Kg6NU1Q"
      }
    ]
}

compact_jwts = jws_json_to_compact(jws_json_serialization)

for i, jwt in enumerate(compact_jwts):
    print(f"\nJWT {i+1}:\n{jwt}\n")
