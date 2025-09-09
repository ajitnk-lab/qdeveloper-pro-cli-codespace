import pytest
from calculator import add, multiply, calculate

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_multiply():
    assert multiply(3, 4) == 12
    assert multiply(0, 5) == 0

def test_calculate():
    assert calculate("add", 5, 3) == 8
    assert calculate("multiply", 2, 6) == 12
    
    with pytest.raises(ValueError):
        calculate("subtract", 5, 3)
