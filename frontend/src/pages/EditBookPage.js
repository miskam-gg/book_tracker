import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './EditBookPage.css'; // Подключаем стили для EditBookPage

const EditBookPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axiosInstance.get(`/books/${id}/`)
            .then(response => {
                const book = response.data;
                setTitle(book.title);
                setAuthor(book.author);
                setIsbn(book.isbn);
                setPublishedDate(book.published_date);
                setDescription(book.description);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, author, isbn, published_date: publishedDate, description };
        axiosInstance.put(`/books/${id}/`, data)
            .then(response => {
                console.log(response.data);
                // Redirect or show success message
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="edit-book">
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit} className="edit-book-form">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <label htmlFor="isbn">ISBN:</label>
                <input
                    type="text"
                    id="isbn"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                />
                <label htmlFor="publishedDate">Published Date:</label>
                <input
                    type="date"
                    id="publishedDate"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBookPage;
