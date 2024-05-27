import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import BookItem from './BookItem';
import './BookList.css';  // Подключаем стили для BookList

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axiosInstance.get('/books/')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    }, []);

    return (
        <div className="book-list">
            {books.map(book => (
                <BookItem key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;
