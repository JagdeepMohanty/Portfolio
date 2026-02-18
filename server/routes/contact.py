from flask import Blueprint, jsonify, request
from database import contacts_collection
from models.contact import Contact
from datetime import datetime

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        contact = Contact(**data)
        contact_data = contact.dict()
        contact_data['timestamp'] = datetime.utcnow()
        result = contacts_collection.insert_one(contact_data)
        return jsonify({"id": str(result.inserted_id), "message": "Message sent successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@contact_bp.route('/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = list(contacts_collection.find().sort("timestamp", -1))
        for contact in contacts:
            contact['_id'] = str(contact['_id'])
            contact['timestamp'] = contact['timestamp'].isoformat()
        return jsonify(contacts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
