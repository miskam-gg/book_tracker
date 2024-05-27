import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import AddReview from '../components/AddReview';
import './BookDetailPage.css'; // Подключаем стили для BookDetailPage

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/books/${id}/`)
            .then(response => setBook(response.data))
            .catch(error => console.log(error));

        axiosInstance.get(`/reviews/?book=${id}`)
            .then(response => setReviews(response.data))
            .catch(error => console.log(error));
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-detail">
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Published Date:</strong> {book.published_date}</p>
            <p>{book.description}</p>

            <AddReview bookId={book.id} />

            <div className="reviews">
                <h2>Reviews</h2>
                {reviews.map(review => (
                    <div key={review.id} className="review">
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <p>{review.review_text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookDetailPage;
