import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const Follow = () => {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        axiosInstance.get('/follows/')
            .then(response => setFollowers(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Followers</h1>
            <ul>
                {followers.map(follower => (
                    <li key={follower.id}>{follower.follower.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Follow;
