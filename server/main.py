from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.projects import projects_bp
from routes.certificates import certificates_bp
from routes.contact import contact_bp
from routes.github import github_bp

load_dotenv()

app = Flask(__name__)

# Configure CORS for production (Netlify frontend)
cors_origins = os.getenv('CORS_ORIGINS', '*')
CORS(app, origins=cors_origins)

app.register_blueprint(projects_bp, url_prefix='/api')
app.register_blueprint(certificates_bp, url_prefix='/api')
app.register_blueprint(contact_bp, url_prefix='/api')
app.register_blueprint(github_bp, url_prefix='/api')

@app.route('/')
def home():
    return jsonify({"message": "Portfolio API is running"}), 200

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
