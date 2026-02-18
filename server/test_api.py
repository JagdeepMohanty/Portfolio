"""
API Testing Script
Run this after starting the Flask server to test all endpoints
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_health():
    print("\n🔍 Testing Health Endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_get_projects():
    print("\n🔍 Testing GET Projects...")
    response = requests.get(f"{BASE_URL}/projects")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Projects found: {len(data)}")
    return response.status_code == 200

def test_create_project():
    print("\n🔍 Testing CREATE Project...")
    project_data = {
        "title": "Test Project",
        "description": "This is a test project",
        "tech_stack": ["React", "Flask", "MongoDB"],
        "github_link": "https://github.com/test/repo",
        "demo_link": "https://demo.test.com",
        "image_url": "https://via.placeholder.com/400"
    }
    response = requests.post(
        f"{BASE_URL}/projects",
        json=project_data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 201

def test_get_certificates():
    print("\n🔍 Testing GET Certificates...")
    response = requests.get(f"{BASE_URL}/certificates")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Certificates found: {len(data)}")
    return response.status_code == 200

def test_create_certificate():
    print("\n🔍 Testing CREATE Certificate...")
    cert_data = {
        "title": "Test Certificate",
        "issuer": "Test Organization",
        "date": "January 2024",
        "image_url": "https://via.placeholder.com/400"
    }
    response = requests.post(
        f"{BASE_URL}/certificates",
        json=cert_data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 201

def test_submit_contact():
    print("\n🔍 Testing Contact Form...")
    contact_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message"
    }
    response = requests.post(
        f"{BASE_URL}/contact",
        json=contact_data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 201

def test_github_repos():
    print("\n🔍 Testing GitHub Repos...")
    response = requests.get(f"{BASE_URL}/github/repos")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Repos found: {len(data)}")
    else:
        print(f"Response: {response.json()}")
    return response.status_code in [200, 400]  # 400 if username not configured

def run_all_tests():
    print("=" * 50)
    print("🚀 Starting API Tests")
    print("=" * 50)
    
    tests = [
        ("Health Check", test_health),
        ("Get Projects", test_get_projects),
        ("Create Project", test_create_project),
        ("Get Certificates", test_get_certificates),
        ("Create Certificate", test_create_certificate),
        ("Submit Contact", test_submit_contact),
        ("GitHub Repos", test_github_repos),
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, "✅ PASSED" if result else "❌ FAILED"))
        except Exception as e:
            results.append((name, f"❌ ERROR: {str(e)}"))
    
    print("\n" + "=" * 50)
    print("📊 Test Results Summary")
    print("=" * 50)
    for name, result in results:
        print(f"{name}: {result}")
    print("=" * 50)

if __name__ == "__main__":
    try:
        run_all_tests()
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Cannot connect to server!")
        print("Make sure the Flask server is running on http://localhost:5000")
