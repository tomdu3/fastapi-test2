import { useState, useEffect } from 'react';
import { z } from 'zod';
import { BookSchema, type Book } from '../schemas';
import { BookCard } from './BookCard.tsx';


// Main Booklist component
export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // create async func to allow us to use await
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books');
        const data = await response.json();

        // Validate response data with Zod schema
        const validateBooks = z.array(BookSchema).parse(data);
        setBooks(validateBooks);
        setError(null);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(`Validation error: ${error.errors[0].message}`);
        } else {
          setError('An error occurred while fetching books.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="books-container">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;