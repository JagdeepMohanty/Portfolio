from pydantic import BaseModel

class Certificate(BaseModel):
    title: str
    issuer: str
    date: str
    image_url: str
