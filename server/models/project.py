from pydantic import BaseModel
from typing import List

class Project(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    github_link: str
    demo_link: str
    image_url: str
