import requests

def test_flow():
    url_reg = "http://127.0.0.1:8000/auth/register"
    data_reg = {
        "user_name": "testuser",
        "birth_date": "2000-01-01",
        "email": "test@test.com",
        "password": "password123"
    }
    try:
        response = requests.post(url_reg, json=data_reg)
        print(f"Register Status: {response.status_code}")
        print(f"Register Response: {response.text}")
    except Exception as e:
        print(f"Register Error: {e}")

    url_log = "http://127.0.0.1:8000/api/login"
    data_log = {
        "email": "test@test.com",
        "password": "password123"
    }
    try:
        response = requests.post(url_log, json=data_log)
        print(f"Login Status: {response.status_code}")
        print(f"Login Response: {response.text}")
    except Exception as e:
        print(f"Login Error: {e}")

if __name__ == "__main__":
    test_flow()
