// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };

    const isAuthenticated = !!localStorage.getItem('access');

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Book Tracker
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/books">Books</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                                <Link to="/add-book">Add Book</Link>
                                <Link to="/add-review">Add Review</Link>
                                <Link to="/create-book-club">Create Book Club</Link>
                                <Link to="/follow">Follow</Link>
                                <Link to="/update-profile">Update Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
