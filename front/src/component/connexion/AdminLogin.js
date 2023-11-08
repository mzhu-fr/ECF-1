import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthentificationContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export const AdminLogin = () => {
    const { adminLogin, currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

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
            await adminLogin(inputs);
            navigate('/profile')
        }
        catch (err) {
            console.log(err);
            setMessage(err.response.data)
        }
    }
    if (currentUser) {
        return <Navigate to="/" />
    }
    return (
        <div className="admin-login login">
            <h1>Employee</h1>
            <div className="admin-login form">
                {message && <p> {message} </p>}
                <div className="admin-form">
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
                <p>Are you not an employee ? Try <Link to="/register-login">here</Link> !</p>
            </div>

        </div>
    )
}
