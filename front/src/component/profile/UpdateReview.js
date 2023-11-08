import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthentificationContext'

export const UpdateReview = () => {
    const location = useLocation()
    const carId = location.pathname.split("/")[2]
    const [getReviewData, setGetReviewData] = useState({
        review: "",
        note: "",
        idcars: ""
    })
    const [inputs, setInputs] = useState({
        review: "",
        note: "",
        idcars: ""
    })

    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch("http://localhost:8800/reviews/user-car-review/" + currentUser.iduser + "/" + carId, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (res.ok) {
                    const getData = await res.json();
                    setGetReviewData({
                        review: getData[0].review,
                        note: getData[0].note,
                        idcars: carId
                    });
                    setInputs({
                        review: getData[0].review,
                        note: getData[0].note,
                        idcars: carId
                    })
                }
                else {
                    console.log("Something went wrong.")
                }
            }
            catch (err) {
                console.log(err)
            }
        };
        getData()
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8800/reviews/user-reviews/" + currentUser.iduser, {
                method: "PUT",
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.ok) {
                navigate("/profile")
            }
            else {
                console.log("Something went wrong.")
            }
        }
        catch (err) {
            console.log("An error occured, please try to update your review later.")
        }
    }

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (currentUser) {
        return (
            <div>
                <div className="register-form">
                    <h1>Modify your review</h1>
                    <div className="form-section">
                        <label>Review :</label>
                        <input defaultValue={getReviewData.review} placeholder="review" name="review" type="text" onChange={handleChange} />
                    </div>
                    <div className="form-section">
                        <label>Note (Previous note :  {getReviewData.note}/ 10) :</label>
                        <select defaultValue={getReviewData.note} name="note" onChange={handleChange}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <button className="update-button" onClick={handleUpdate}>Update</button>
                </div>
            </div>
        )
    }
    else {
        return <Navigate to="/" />
    }
}
