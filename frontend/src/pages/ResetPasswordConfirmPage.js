import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './ResetPasswordConfirmPage.css'; // Подключаем стили для ResetPasswordConfirmPage

const ResetPasswordConfirmPage = () => {
    const { uid, token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        axiosInstance.post(`/password-reset-confirm/${uid}/${token}/`, { new_password1: newPassword, new_password2: confirmPassword })
            .then(response => {
                console.log(response.data);
                // Redirect or show success message
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="reset-password-confirm">
            <h1>Set New Password</h1>
            <form onSubmit={handleSubmit} className="reset-password-confirm-form">
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Set Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordConfirmPage;
