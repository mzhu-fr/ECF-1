import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const UserRD = () => {
    const [getUser, setGetUser] = useState({})

    const handleDelete = async (id) => {
        const res = await fetch("http://localhost:8800/users/all/user/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            window.location.reload()
        }
        else {
            console.log("User not deleted.")
        }
    }

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:8800/users/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                const getUsers = await res.json()
                setGetUser(getUsers)
            }
        };
        getData();
    })
    return (
        <div className="user-CRUD">
            <h1>All users</h1>
            <div className="user-read">
                {getUser[0] ? getUser.map((user) => (
                    <div className="user-display-unique">
                        <div>
                            <span>Account name :</span>
                            <p>{user.acc_name}</p>
                        </div>
                        <div>
                            <span>Email :</span>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <span>First name :</span>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <span>Last Name :</span>
                            <p>{user.fam_name}</p>
                        </div>
                        <div className="update-delete-buttons">
                            <button className="delete-button" onClick={() => handleDelete(user.iduser)}>Delete</button>
                            <Link to={"/admin/user-update/" + user.iduser}><button className="update-button">Update</button></Link>
                        </div>
                    </div>
                )) : ""}
            </div>
        </div>
    )
}

export const UserCreate = () => {

    const avatar = Math.round(Math.random() * 8);
    const username = "user" + Math.round(Math.random() * 1000000);

    const [inputs, setInputs] = useState({
        acc_name: username,
        email: "",
        password: "",
        name: "",
        fam_name: "",
        avatar: avatar
    })

    const [message, setMessage] = useState();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8800/users/all", {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            const errorData = await res.json()
            setMessage(errorData)
        }
        else {
            setMessage("User added !")
            window.location.reload()
        }
    }
    return (
        <div className="user-CRUD">
            <h1>Create user</h1>
            <div className="user-create">
                {message && <p>{message}</p>}
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