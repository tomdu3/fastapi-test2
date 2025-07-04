from data import books_db
from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get("/api/books", response_model=list[Book])
async def get_books():
    return books_db