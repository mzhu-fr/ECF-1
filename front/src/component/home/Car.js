import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthentificationContext'

export const Car = () => {
    const [car, setCar] = useState({})

    const [carReview, setCarReview] = useState({})

    const { currentUser } = useContext(AuthContext)
    const [userId, setUserId] = useState("0")


    const [review, setReview] = useState({
        iduser: userId
    })

    const [message, setMessage] = useState()

    const location = useLocation();

    const carId = location.pathname.split("/")[2]
    console.log(carId)

    useEffect(() => {
        const getCars = async () => {
            const res = await fetch("http://localhost:8800/cars/cars-display/" + carId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await fetch("http://localhost:8800/reviews/car-review/" + carId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
            if (!res.ok) {
                console.log("Can't get cars")
            }
            if (!response.ok) {
                console.log("Can't get car review")
            }
            else {
                const getRes = await res.json()
                const getRev = await response.json()
                console.log(getRes)
                setCar(getRes)
                setCarReview(getRev)
            }
        };
        getCars()
    })

    const handleChange = (e) => {
        setReview(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        if (currentUser.iduser) {
            const res = await fetch("http://localhost:8800/reviews/car-reviews/" + carId, {
                method: "POST",
                body: JSON.stringify(review),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                setMessage("Review added! ")
            }
            else {
                setMessage(res.ok)
            }
        }

    }
    return (
        <div className="product-CRUD">
            {car ?
                <div className="car-display-unique">
                    <div>
                        <span>Name :</span>
                        <p>{car.name}</p>
                    </div>
                    <div>
                        <span>Brand :</span>
                        <p>{car.brand}</p>
                    </div>
                    <div>
                        <span>Model :</span>
                        <img src={car.model} alt="photo" />
                    </div>
                    <div>
                        <span>Type :</span>
                        <p>{car.type}</p>
                    </div>

                </div>
                : ""}
            {currentUser ?
                <div>
                    {message && <p>{message}</p>}
                    <label>Leave a comment :</label>
                    <input name="review" placeholder="Write your review" onChange={handleChange} />
                    <select name="note" onChange={handleChange}>
                        <option name="note" value="0">0</option>
                        <option name="note" value="1">1</option>
                        <option name="note" value="2">2</option>
                        <option name="note" value="3">3</option>
                        <option name="note" value="4">4</option>
                        <option name="note" value="5">5</option>
                        <option name="note" value="6">6</option>
                        <option name="note" value="7">7</option>
                        <option name="note" value="8">8</option>
                        <option name="note" value="9">9</option>
                        <option name="note" value="10">10</option>
                    </select>
                    <button className="submit-button" onClick={handleClick}>Submit</button>
                </div>
                : ""}

            {carReview[0] ? carReview.map(review => (
                <div key={review.iduser}>
                    {review.review}
                    {review.note}
                </div>
            )) : ""}

        </div>
    )
}
