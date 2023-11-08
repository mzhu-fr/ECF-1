import React, { useContext, useState } from 'react';

import './connexion.css';
import { AuthContext } from '../../context/AuthentificationContext';
import { useNavigate } from 'react-router-dom';


export const UserLogin = () => {

    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const [message, setMessage] = useState()

    const handleChange = e => {
        setMessage();
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await userLogin(inputs);
            navigate('/profile')
        }
        catch (err) {
            console.log(err.response.data);
            setMessage(err.response.data)
        }
    }
    return (
        <div className="user-login login">
            <h1>Login</h1>
            <div className="user-login form">
                {message && <p className="message-update">{message} </p>}
                <div className="login-form">
                    <div className="form-section">
                        <label>Email :</label>
                        <input placeholder="Enter your email" name="email" type="email" onChange={handleChange} />
                    </div>

                    <div className="form-section">
                        <label>Password :</label>
                        <input placeholder="Enter your password" name="password" type="password" onChange={handleChange} />
                    </div>

                    <button type="button" className="submit-form" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}
