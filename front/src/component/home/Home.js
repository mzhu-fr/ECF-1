import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'

export const Home = () => {

    const [getData, setGetData] = useState({})

    useEffect(() => {
        const getCars = async () => {
            const res = await fetch("http://localhost:8800/cars/cars-display", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
            if (!res.ok) {
                console.log("Can't get cars")
            }
            else {
                const getRes = await res.json()
                // console.log(getRes)
                setGetData(getRes)
            }
        };
        getCars()
    })
    return (
        <div className="product-CRUD">
            {getData[0] ? getData.map(car => (
                <div className="car-display-unique" >
                    <div>
                        <span>Name :</span>
                        <p>{car.name}</p>
                    </div>
                    <div>
                        <span>Brand :</span>
                        <p>{car.brand}</p>
                    </div>
                    <div>
                        <img src={car.model} alt="photo" />
                    </div>
                    <div>
                        <span>Type :</span>
                        <p>{car.type}</p>
                    </div>
                    <Link to={"/cars/" + car.idcars}><button className="update-button">View car</button></Link>
                </div>
            )) : ""}
        </div>
    )
}