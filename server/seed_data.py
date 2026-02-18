from database import projects_collection, certificates_collection
from datetime import datetime

# Sample projects data
sample_projects = [
    {
        "title": "E-Commerce Platform",
        "description": "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
        "tech_stack": ["React", "Node.js", "MongoDB", "Stripe"],
        "github_link": "https://github.com/yourusername/ecommerce",
        "demo_link": "https://ecommerce-demo.com",
        "image_url": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800"
    },
    {
        "title": "Task Management App",
        "description": "A collaborative task management application with real-time updates and team features.",
        "tech_stack": ["React", "Flask", "PostgreSQL", "Socket.io"],
        "github_link": "https://github.com/yourusername/taskmanager",
        "demo_link": "https://taskmanager-demo.com",
        "image_url": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"
    },
    {
        "title": "Weather Dashboard",
        "description": "Real-time weather dashboard with forecasts, maps, and location-based alerts.",
        "tech_stack": ["React", "Python", "OpenWeather API", "Chart.js"],
        "github_link": "https://github.com/yourusername/weather",
        "demo_link": "https://weather-demo.com",
        "image_url": "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"
    }
]

# Sample certificates data
sample_certificates = [
    {
        "title": "AWS Certified Solutions Architect",
        "issuer": "Amazon Web Services",
        "date": "January 2024",
        "image_url": "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800"
    },
    {
        "title": "Full Stack Web Development",
        "issuer": "Coursera",
        "date": "December 2023",
        "image_url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"
    },
    {
        "title": "Python for Data Science",
        "issuer": "DataCamp",
        "date": "November 2023",
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800"
    }
]

def seed_database():
    print("Seeding database...")
    
    # Clear existing data
    projects_collection.delete_many({})
    certificates_collection.delete_many({})
    
    # Insert sample projects
    projects_result = projects_collection.insert_many(sample_projects)
    print(f"Inserted {len(projects_result.inserted_ids)} projects")
    
    # Insert sample certificates
    certificates_result = certificates_collection.insert_many(sample_certificates)
    print(f"Inserted {len(certificates_result.inserted_ids)} certificates")
    
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
