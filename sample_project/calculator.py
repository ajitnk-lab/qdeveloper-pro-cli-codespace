def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def calculate(operation, x, y):
    if operation == "add":
        return add(x, y)
    elif operation == "multiply":
        return multiply(x, y)
    else:
        raise ValueError("Unsupported operation")

if __name__ == "__main__":
    result = calculate("add", 5, 3)
    print(f"5 + 3 = {result}")
