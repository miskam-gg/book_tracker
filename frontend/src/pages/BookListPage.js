import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axiosInstance.get('/books/')
            .then(response => setBooks(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {books.length ? (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
};

export default BookList;
