from flask import Blueprint, jsonify
import requests
import os

github_bp = Blueprint('github', __name__)

GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "")

@github_bp.route('/github/repos', methods=['GET'])
def get_github_repos():
    try:
        if not GITHUB_USERNAME:
            return jsonify({"error": "GitHub username not configured"}), 400
        
        url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"
        params = {"sort": "updated", "per_page": 10}
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            repos = response.json()
            filtered_repos = [{
                "name": repo["name"],
                "description": repo["description"],
                "html_url": repo["html_url"],
                "homepage": repo["homepage"],
                "language": repo["language"],
                "stargazers_count": repo["stargazers_count"],
                "forks_count": repo["forks_count"]
            } for repo in repos]
            return jsonify(filtered_repos), 200
        return jsonify({"error": "Failed to fetch repositories"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
