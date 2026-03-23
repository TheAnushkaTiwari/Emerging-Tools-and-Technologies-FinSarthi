import requests

# The URL of your running server
url = "http://127.0.0.1:8000/api/chat/ask/"

# A question that should be in your RBI PDF
question = "What is investment?"

print(f"Asking FinSarthi: '{question}'...")

try:
    response = requests.post(url, json={"message": question})
    
    if response.status_code == 200:
        print("\nSUCCESS!")
        print("Bot Answer:", response.json().get("answer"))
        print("Sources:", response.json().get("sources"))
    else:
        print("\nError:", response.status_code)
        print(response.text)

except Exception as e:
    print(f"\nConnection Failed: {e}")