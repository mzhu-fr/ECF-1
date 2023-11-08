import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthentificationContext';
import { Link, Navigate } from 'react-router-dom';

// AVATAR IMAGES
import Image1 from '../../images/avatar/1.png';
import Image2 from '../../images/avatar/2.png';
import Image3 from '../../images/avatar/3.png';
import Image4 from '../../images/avatar/4.png';
import Image5 from '../../images/avatar/5.png';
import Image6 from '../../images/avatar/6.png';
import Image7 from '../../images/avatar/7.png';
import Image8 from '../../images/avatar/8.png';
import Image9 from '../../images/avatar/9.png';


import './profil.css';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/i;
const passwordRegex = /^[a-zA-Z0-9]{6,}$/;

const Trombinoscope = () => {
    const { currentUser } = useContext(AuthContext)

    const [getTrombi, setGetTrombi] = useState({})

    const avatar = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
        Image6,
        Image7,
        Image8,
        Image9
    ]

    useEffect(() => {
        const getData = async () => {

            const res = await fetch("http://localhost:8800/employee/colleague", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                console.log("Trombinoscope info not loaded from the back")
            }
            else {
                const getRes = await res.json();
                setGetTrombi(getRes)
                console.log("Trombinoscope loaded")
            }
        };
        if (currentUser && currentUser.picture) {
            getData();
            return;
        }
    }, [])
    if (currentUser && currentUser.picture) {
        return (
            <div className="colleague-trombinoscope">

                {getTrombi[0] ? getTrombi.map(colleague => (
                    <div className="colleague-unique" key={colleague.idemployee}>
                        {colleague.picture ? <img src={avatar[colleague.picture]} alt={avatar[colleague.picture]} /> : ""}
                        <div>
                            <span>Name : </span>
                            <p>{colleague.name}</p>
                        </div>
                        <div>
                            <span>Family Name :</span>
                            <p>{colleague.fam_name}</p>
                        </div>
                        <div>
                            <span>Phone:</span>
                            <p>{colleague.phone}</p>
                        </div>
                        <div>
                            <span>Gender :</span>
                            <p>{colleague.gender}</p>
                        </div>
                    </div>
                )) : ""}
            </div>
        )
    }
}

const ModifyPassword = () => {
    const { currentUser } = useContext(AuthContext);

    const [message, setMessage] = useState()

    const [password, setPassword] = useState({
        password: ""
    })

    const [comparePassword, setComparePassword] = useState()
    const handleChange = (e) => {
        setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleComparePassword = (e) => {
        setComparePassword(e.target.value)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        if (passwordRegex.test(password)) {
            setMessage("Password has to be at least 6 characters long.")
        }
        if (password.password !== comparePassword) {
            setMessage("Password is not the same, please verify that you typed the correct password.")
        }
        else {
            try {
                const res = await fetch("http://localhost:8800/users/all/password/" + currentUser.iduser, {
                    method: 'PUT',
                    body: JSON.stringify(password),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!res.ok) {
                    const errorData = await res.json();
                    setMessage(errorData);
                } else {
                    setMessage("Updates will be taken in account at your next log in.")
                }
            }
            catch (err) {
                setMessage("An error occurred while updating your password, please try another time.")
            }
        }
    }

    const handleClickAdmin = async (e) => {
        e.preventDefault()
        if (passwordRegex.test(password)) {
            setMessage("Password has to be at least 6 characters long.")
        }
        if (password.password !== comparePassword) {
            setMessage("Password is not the same, please verify that you typed the correct password.")
        }
        else {
            try {
                const res = await fetch("http://localhost:8800/employee/update-pwd/" + currentUser.idemployee, {
                    method: 'PUT',
                    body: JSON.stringify(password),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!res.ok) {
                    const errorData = await res.json();
                    setMessage(errorData);
                } else {
                    setMessage("Updates will be taken in account at your next log in.")
                }
            }
            catch (err) {
                setMessage("An error occurred while updating your password, please try another time.")
            }
        }
    }

    if (currentUser && currentUser.avatar) {
        return (
            <div>
                <div className="user-register form">
                    {message && <p className="message-update">{message} </p>}
                    <div className="register-form">
                        <div className="form-section">
                            <label>New Password :</label>
                            <input placeholder="Enter your password" type="password" onChange={handleComparePassword} />
                        </div>
                        <div className="form-section">
                            <label>Password :</label>
                            <input placeholder="Enter your password" type="password" name="password" onChange={handleChange} />
                        </div>
                    </div>
                    <button className="submit-form" onClick={handleClick}>Submit New Password</button>
                </div>
            </div>
        )
    }
    else if (currentUser && currentUser.picture) {
        return (
            <div>
                <div className="user-register form">
                    {message && <p className="message-update">{message} </p>}
                    <div className="register-form">
                        <div className="form-section">
                            <label>New Password :</label>
                            <input placeholder="Enter your password" type="password" onChange={handleComparePassword} />
                        </div>
                        <div className="form-section">
                            <label>Password :</label>
                            <input placeholder="Enter your password" type="password" name="password" onChange={handleChange} />
                        </div>
                    </div>
                    <button className="submit-form" onClick={handleClickAdmin}>Submit New Password</button>
                </div>
            </div>
        )
    }

}

const ModifyInfo = () => {
    const { currentUser } = useContext(AuthContext)

    const [inputs, setInputs] = useState({
        name: "",
        fam_name: "",
        email: ""
    })

    const [userInfo, setUserInfo] = useState({
        name: "",
        fam_name: "",
        email: ""
    })

    useEffect(() => {
        if (currentUser) {
            setUserInfo({
                name: currentUser.name,
                fam_name: currentUser.fam_name,
                email: currentUser.email
            })
            setInputs({
                name: currentUser.name,
                fam_name: currentUser.fam_name,
                email: currentUser.email
            })
        }
    }, [])

    const [message, setMessage] = useState()
    const handleChange = (e) => {
        if (e.target.value.length < 1) {
            setMessage("Please write something")
        }
        else {
            setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }
    const handleClick = async (e) => {
        e.preventDefault()
        if ((inputs.name.length || inputs.email.length || inputs.fam_name) < 1) {
            setMessage("There cannot be an empty field.")
        }
        else if (!emailRegex.test(inputs.email)) {
            setMessage("Please write a valid email address.")
        }
        else {
            try {
                const res = await fetch("http://localhost:8800/users/all/user/" + currentUser.iduser, {
                    method: 'PUT',
                    body: JSON.stringify(inputs),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!res.ok) {
                    const errorData = await res.json();
                    setMessage(errorData);
                } else {
                    setMessage("Updates will be taken in account at your next log in.")
                }
            }
            catch (err) {
                setMessage("An error occurred while updating your info, please try another time.")
            }
        }

    }
    return (
        <div>
            <div className="register-form">
                <div className="form-section">
                    {message && <p className="message-update">{message}</p>}
                    <label>Email :</label>
                    <input defaultValue={userInfo.email} placeholder="Enter your email" name="email" type="email" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>First Name :</label>
                    <input defaultValue={userInfo.name} placeholder="Enter your first name" name="name" type="text" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Last Name :</label>
                    <input defaultValue={userInfo.fam_name} placeholder="Enter your last name" name="fam_name" type="text" onChange={handleChange} />
                </div>
                <button className="submit-form" onClick={handleClick}>Change</button>
            </div>

        </div>
    );
}

export const Profil = () => {
    const { currentUser } = useContext(AuthContext);

    const [modifyPassword, setModifyPassword] = useState(false);
    const [modifyInfo, setModifyInfo] = useState(false);
    const [getReviews, setGetReviews] = useState({})
    const [reviewData, setReviewData] = useState({
        idcars: "",
        iduser: ""
    })

    const avatar = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
        Image6,
        Image7,
        Image8,
        Image9
    ]

    const handleModifyInfo = () => {
        setModifyInfo(true);
        setModifyPassword(false);
    }

    const handleModifyPassword = () => {
        setModifyInfo(false);
        setModifyPassword(true);
    }

    const handleCloseChange = () => {
        setModifyInfo(false);
        setModifyPassword(false);
    }

    const handleDeleteReview = async (idcars, iduser) => {
        setReviewData({
            iduser: iduser,
            idcars: idcars
        })
        try {
            const res = await fetch("http://localhost:8800/reviews/user-reviews", {
                method: 'DELETE',
                body: JSON.stringify(reviewData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData)
            } else {
                console.log("Successfully deleted !")
            }
        }
        catch (err) {

        }
    }

    useEffect(() => {
        const getReviews = async () => {
            if (currentUser) {
                try {
                    const res = await fetch("http://localhost:8800/reviews/user-reviews/" + currentUser.iduser, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (res.ok) {
                        const getData = await res.json();
                        setGetReviews(getData)
                    }
                    else {
                        console.log("Couldn't get any reviews !")
                    }
                }
                catch (err) {
                    console.log("An error occured, we cannot load info");
                }
            }
        };
        getReviews()
    }, [])

    if (!currentUser) {
        return <Navigate to="/" />
    }
    else if (currentUser && currentUser.avatar) {
        return (
            <div className="profile-page">
                <div className="user-name">
                    <span className="username">Welcome</span>
                    {currentUser && currentUser.avatar ? <span className="username acc_name">{currentUser.acc_name}</span> : ""}
                </div>
                <div className="user-avatar">
                    {currentUser && currentUser.avatar ? <img src={avatar[currentUser.avatar]} alt="" /> : ""}
                </div>

                <div className="user-change">
                    {currentUser && currentUser.avatar ?
                        // CASE WHERE THE USER IS A REGULAR USER
                        <div>
                            <div className="user-change-buttons">
                                <div className="modify-info" onClick={handleModifyInfo}>Modify personnal info</div>
                                <div className="modify-password" onClick={handleModifyPassword}>Modify password</div>
                                {modifyInfo || modifyPassword ? <div className="close-changes" onClick={handleCloseChange}>x</div> : ""}
                            </div>
                            <div className="display-modify">
                                {modifyInfo ? <div> < ModifyInfo /></div> : ""}
                                {modifyPassword ? <div>< ModifyPassword /></div> : ""}
                            </div>
                        </div>


                        : ""}
                </div>
                <div className="user-misc">
                    {currentUser && currentUser.avatar ?
                        <div className="user-info-display">
                            <p>First Name : {currentUser.name}</p>
                            <p>Last Name : {currentUser.fam_name}</p>
                            <p>Email : {currentUser.email}</p>
                        </div>
                        : ""}
                </div>
                {currentUser && currentUser.avatar && getReviews[0] ?
                    <div className="user-reviews">
                        {getReviews[0] ? getReviews.map(notation => (
                            <div className="unique-review" key={notation.idcars}>
                                <div ><h5>{notation.name}</h5> </div>
                                <div className="review-section">
                                    <span>Review :</span>
                                    <span>{notation.comment}</span>
                                    <p>Note : {notation.note}</p>
                                </div>

                                <div className="update-delete-button">
                                    <button className="delete-button" onClick={() => handleDeleteReview(notation.idcars, currentUser.iduser)}>Delete</button>
                                    <Link to={"/user-review/" + notation.idcars}><button className="update-button">Update</button></Link>
                                </div>
                            </div>
                        )) : ""}
                    </div>
                    : ""}
            </div >
        )
    }
    else {
        return (
            <div className="profile-page">
                <div className="user-name">
                    <span className="username">Welcome</span>
                    {currentUser && currentUser.picture ? <span className="username acc_name">{currentUser.name} {currentUser.fam_name}</span> : ""}
                </div>
                <div className="user-avatar">
                    {currentUser && currentUser.picture ? <img src={avatar[currentUser.picture]} alt="" /> : ""}
                </div>

                <div className="user-change">
                    {currentUser && currentUser.picture ?
                        // CASE WHERE THE USER IS AN EMPLOYEE AND MORE
                        <div>
                            {currentUser.picture ? <img src={avatar[currentUser.picture]} alt={avatar[currentUser.picture]} /> : ""}
                            <div className="user-change-buttons">
                                <div className="modify-password" onClick={handleModifyPassword}>Modify password</div>
                                {modifyPassword ? <div className="close-changes" onClick={handleCloseChange}>x</div> : ""}
                            </div>
                            <div className="display-modify">
                                {modifyPassword ? <div>< ModifyPassword /></div> : ""}
                            </div>
                        </div>


                        : ""}
                </div>
                <div className="user-misc">
                    {currentUser && currentUser.picture ?
                        <div className="user-info-display">
                            <p>First Name : {currentUser.name}</p>
                            <p>Last Name : {currentUser.fam_name}</p>
                            <p>Email : {currentUser.email}</p>
                            <p>Adress : {currentUser.adress}</p>
                            <p>Zipcode : {currentUser.zipcode}</p>
                            <p>Social Security : {currentUser.social_security}</p>
                            <p>Status : {currentUser.status}</p>
                            <p>Profile created : {currentUser.created}</p>
                            <p>Acreditations : {currentUser.grade}</p>
                        </div>
                        : ""}
                </div>
                <div>
                    {currentUser && currentUser.picture ? <div className="trombinoscope-arrow-function">
                        <h5 className="trombinoscope-title">Trombinoscope</h5>
                        <Trombinoscope />
                    </div> : ""}
                </div>
            </div >
        )
    }

}
