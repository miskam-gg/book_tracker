import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './AddReview.css'; // Подключаем стили для AddReview

const AddReview = ({ bookId }) => {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { book: bookId, rating, review_text: reviewText };
        axiosInstance.post('/reviews/', data)
            .then(response => {
                console.log(response.data);
                // Handle success, e.g., clear the form
                setRating(1);
                setReviewText('');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="add-review">
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit} className="add-review-form">
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                />
                <label htmlFor="reviewText">Review:</label>
                <textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
