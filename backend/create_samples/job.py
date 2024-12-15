import time

import requests
import schedule


def call_api():
    try:
        response = requests.post("http://localhost:8000/api/tracking/random-position/")
        print(f"API Response: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error calling API: {e}")


schedule.every(1).seconds.do(call_api)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(60)
