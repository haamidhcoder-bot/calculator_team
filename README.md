# Calculator with Python Flask Backend

## Run locally

1. Install Python 3.10 or newer.
2. Open a terminal in this folder.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```
5. Open http://127.0.0.1:5000 in your browser.

The calculator frontend sends expressions to the local `/api/calculate` endpoint. The backend only accepts arithmetic expressions and does not use Python `eval()`.
