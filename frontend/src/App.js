// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Follow from './components/Follow';
import BookClub from './components/BookClub';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<BookListPage />} />
                    <Route path="/book/:id" element={<BookDetailPage />} />
                    <Route path="/add-book" element={<AddBookPage />} />
                    <Route path="/edit-book/:id" element={<EditBookPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/reset-password-confirm/:uid/:token" element={<ResetPasswordConfirmPage />} />
                    <Route path="/update-profile" element={<UpdateProfilePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/follow" element={<Follow />} />
                    <Route path="/bookclubs" element={<BookClub />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
