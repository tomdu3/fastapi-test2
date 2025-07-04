from data import books_db
from fastapi import FastAPI
from pydantic import BaseModel, Field


app = FastAPI()

class Book(BaseModel):
    id: int
    title: str
    genre: str
    year: int
    edition: int = Field(default=1, ge=1)
    author: "Author"  # if definition of a class comes after, then quotes


class Author(BaseModel):
    id: int
    name: str
    bio: str | None = None


@app.get("api//books", response_model=list[Book])
async def get_books():
    return books_db