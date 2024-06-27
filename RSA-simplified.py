import random

def is_prime(num):
    """Check if a number is a prime number."""
    if num <= 1:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def generate_random_prime(min_value, max_value):
    """Generate a random prime number within a given range."""
    while True:
        num = random.randint(min_value, max_value)
        if is_prime(num):
            return num

def find_public_key(t):
    """Find a prime number that is less than t and not a factor of t."""
    for possible_e in range(2, t):
        if is_prime(possible_e) and t % possible_e != 0:
            return possible_e
    return None

def find_private_key(e, t):
    """Find a private key d such that (e * d) % t == 1."""
    d = 1
    while (e * d) % t != 1:
        d += 1
    return d

def main(p=None, q=None):
    if p is None or q is None:
        # Generate random prime numbers for p and q if not provided
        p = generate_random_prime(100, 500)
        q = generate_random_prime(100, 500)
    else:
        # Validate that provided p and q are prime
        if not is_prime(p) or not is_prime(q):
            print(f"\nError: One or both numbers, p = {p} and q = {q}, are not primes.")
            return  # Exit if either number is not a prime to avoid further computation

    print(f"\nStep 1: Chosen prime numbers are p = {p} and q = {q}.")

    # Step 2: Calculate n = p * q
    n = p * q
    print(f"Step 2: Calculated n = p * q = {n}.")

    # Step 3: Calculate t = (p - 1) * (q - 1)
    t = (p - 1) * (q - 1)
    print(f"Step 3: Calculated t = (p - 1) * (q - 1) = {t}.")

    # Step 4: Find a suitable public key e
    e = find_public_key(t)
    if e is not None:
        print(f"Step 4: Found a suitable public key e = {e}.")
    else:
        print("Error: No valid public key found that meets the criteria.")

    # Step 5: Find the corresponding private key d
    if e is not None:
        d = find_private_key(e, t)
        print(f"Step 5: Found the corresponding private key d = {d}.")
    else:
        d = None

    # Output the final parameters
    if e is not None and d is not None:
        print(f"Final parameters are: p = {p}, q = {q}, n = {n}, t = {t}, e = {e}, d = {d}.")
    else:
        print("Failed to generate valid RSA parameters due to the lack of a suitable e or d.")

# Example usage
# main(17, 19)  # Example with specified prime numbers
# main()         # Example without specified prime numbers, will generate random primes

main(7, 19)  