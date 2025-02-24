// src/api/authAPI.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth'; // Update with your backend URL

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_BASE}/login`, { email, password });
    return response.data; // Expecting token and/or user details
};

export const registerUser = async (username, email, password) => {
    const response = await axios.post(`${API_BASE}/register`, { username, email, password });
    return response.data;
};
