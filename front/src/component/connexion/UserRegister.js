import React, { useState } from 'react'

export const UserRegister = () => {
    const avatar = Math.round(Math.random() * 20);
    const username = "user" + Math.round(Math.random() * 1000000);

    const [inputs, setInputs] = useState({
        acc_name: username,
        email: "",
        password: "",
        name: "",
        fam_name: "",
        avatar: avatar
    })

    const [message, setMessage] = useState()

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8800/auth/register", {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                const errorData = await res.json();
                setMessage(errorData);
            } else {
                setMessage("Successfully registered !")
            }
        }
        catch (err) {
            setMessage("An error occurred while registering, please try another time.")
        }
    }
    return (
        <div className="user-register register">
            <h1>Register</h1>
            <div className="user-register form">
                {message && <p> {message} </p>}
                <div className="register-form">
                    <div className="form-section">
                        <label>Email :</label>
                        <input placeholder="Enter your email" name="email" type="email" onChange={handleChange} />
                    </div>
                    <div className="form-section">
                        <label>First Name :</label>
                        <input placeholder="Enter your first name" name="name" type="text" onChange={handleChange} />
                    </div>
                    <div className="form-section">
                        <label>Last Name :</label>
                        <input placeholder="Enter your last name" name="fam_name" type="text" onChange={handleChange} />
                    </div>
                    <div className="form-section">
                        <label>Password :</label>
                        <input placeholder="Enter your password" type="password" />
                    </div>
                    <div className="form-section">
                        <label>Retype your password :</label>
                        <input placeholder="Enter your password" name="password" type="password" onChange={handleChange} />
                    </div>
                    <div className="form-section">

                    </div>

                    <button type="button" className="submit-form" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    )
}
