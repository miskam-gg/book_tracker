import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const BookClub = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        axiosInstance.get('/bookclubs/')
            .then(response => setClubs(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Book Clubs</h1>
            <ul>
                {clubs.map(club => (
                    <li key={club.id}>{club.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookClub;
