from flask import Blueprint, jsonify, request
from database import certificates_collection
from models.certificate import Certificate
from bson import ObjectId

certificates_bp = Blueprint('certificates', __name__)

@certificates_bp.route('/certificates', methods=['GET'])
def get_certificates():
    try:
        certificates = list(certificates_collection.find())
        for cert in certificates:
            cert['_id'] = str(cert['_id'])
        return jsonify(certificates), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@certificates_bp.route('/certificates', methods=['POST'])
def create_certificate():
    try:
        data = request.get_json()
        certificate = Certificate(**data)
        result = certificates_collection.insert_one(certificate.dict())
        return jsonify({"id": str(result.inserted_id), "message": "Certificate created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
