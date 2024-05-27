import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './UpdateProfilePage.css'; // Подключаем стили для UpdateProfilePage

const UpdateProfilePage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        axiosInstance.get('/accounts/profile/')
            .then(response => {
                const user = response.data;
                setEmail(user.email);
                setUsername(user.username);
            })
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put('/accounts/profile/', { email, username })
            .then(response => {
                console.log(response.data);
                // Redirect or show success message
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="update-profile">
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit} className="update-profile-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfilePage;
