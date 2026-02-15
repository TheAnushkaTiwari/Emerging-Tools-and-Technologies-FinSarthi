import sys
import os

print("--- DEBUG INFO ---")
try:
    import langchain
    print(f"1. LangChain found at: {langchain.__file__}")
    
    # Check for shadowing
    folder = os.path.dirname(langchain.__file__)
    print(f"2. Is it a folder? {os.path.isdir(folder)}")
    
    # Check for chains
    import langchain.chains
    print(f"3. Chains found at: {langchain.chains.__file__}")
    
except ImportError as e:
    print(f"ERROR: {e}")
    print("\n--- PYTHON PATH ---")
    for p in sys.path:
        print(p)
print("------------------")