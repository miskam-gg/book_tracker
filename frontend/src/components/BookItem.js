import React from 'react';
import { Link } from 'react-router-dom';
import './BookItem.css';  // Подключаем стили для BookItem

const BookItem = ({ book }) => {
    return (
        <div className="book-item">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <Link to={`/book/${book.id}`}>View Details</Link>
        </div>
    );
};

export default BookItem;
