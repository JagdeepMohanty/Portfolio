from flask import Blueprint, jsonify, request
from database import projects_collection
from models.project import Project
from bson import ObjectId

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/projects', methods=['GET'])
def get_projects():
    try:
        projects = list(projects_collection.find())
        for project in projects:
            project['_id'] = str(project['_id'])
        return jsonify(projects), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@projects_bp.route('/projects', methods=['POST'])
def create_project():
    try:
        data = request.get_json()
        project = Project(**data)
        result = projects_collection.insert_one(project.dict())
        return jsonify({"id": str(result.inserted_id), "message": "Project created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@projects_bp.route('/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = projects_collection.find_one({"_id": ObjectId(project_id)})
        if project:
            project['_id'] = str(project['_id'])
            return jsonify(project), 200
        return jsonify({"error": "Project not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
