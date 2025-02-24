import React, { useState } from 'react';
import './loginpage.css';
import Cover from '../src/assets/Images/hero-banner-image.jpg'
import { loginUser, registerUser } from '../src/api/authAPI';


const Loginpage = () => {
    const [isLogin, setIsLogin] = useState(true);


    // State for login fields
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    // State for registration fields
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

    // Handle form input changes
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    // Submit handler for login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser(loginData.email, loginData.password);
            // Save the token, redirect or update context/state as needed
            localStorage.setItem('token', result.token);
            alert('Logged in successfully!');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    // Submit handler for registration
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await registerUser(registerData.username, registerData.email, registerData.password);
            alert(result.message || 'Registered successfully!');
            // Optionally switch to login view after successful registration
            setIsLogin(true);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Registration failed');
        }
    };


    return (
        <div className='loginPages'>
            <div className='loginImage'>
                <img src={Cover} alt="Cover" />
            </div>

            <div>
                {isLogin ? (
                    <form className='loginForm' onSubmit={handleLoginSubmit}>
                        <h2>Please Sign In</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                            className='Feild'
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                            className='Feild'
                        />
                        <button type="submit" className='btn'>Login</button>
                        <h5 onClick={() => setIsLogin(false)} className='Register'>
                            Create new account
                        </h5>
                    </form>
                ) : (
                    <form className='registerForm' onSubmit={handleRegisterSubmit}>
                        <h2>New here! Create an account </h2>
                        <input
                            type="text"
                            name="username"
                            placeholder="Full Name"
                            value={registerData.username}
                            onChange={handleRegisterChange}
                            required
                            className='Feild'
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            required
                            className='Feild'
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            required
                            className='Feild'
                        />
                        <button type="submit" className='btn'>Register</button>
                        <h5 onClick={() => setIsLogin(true)} className='Login'>
                            Already have an account? <span className='loginLink'>Login</span>
                        </h5>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Loginpage;
