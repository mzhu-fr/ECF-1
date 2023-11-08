import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './admin.css'

export const ProductCreate = () => {
    const [inputs, setInputs] = useState({
    })
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:8800/cars/cars-display", {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            window.location.reload()
        }
        else {
            console.log("There was a problem when registering, please retry")
        }
    }
    return (
        <div>
            <div class="form-section">
                <label>Name :</label>
                <input name="name" type="text" placeholder="Name" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Brand :</label>
                <input name="brand" type="text" placeholder="Brand" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Model :</label>
                <input name="model" type="text" placeholder="Model" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Year :</label>
                <input name="year" type="number" placeholder="year" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Price :</label>
                <input name="price" type="number" placeholder="" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Description :</label>
                <input name="description" type="text" placeholder="description" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Second hand ? </label>
                <select name="secondhand" value="no" type="text" placeholder="" onChange={handleChange}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div class="form-section">
                <label>KM :</label>
                <input name="km" type="number" placeholder="kilometers" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Co2 :</label>
                <input name="co2" type="number" placeholder="" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>fuel</label>
                <input name="fuel" type="text" placeholder="" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Transmission :</label>
                <select name="transmission" type="text" placeholder="Transmission" value="none" onChange={handleChange}>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
            <div class="form-section">
                <label>Type :</label>
                <input name="type" type="text" placeholder="Type of car" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Color :</label>
                <input name="color" type="text" placeholder="Car color" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>Number of places</label>
                <input name="nb_places" type="number" placeholder="Number of places" onChange={handleChange}></input>
            </div>
            <div class="form-section">
                <label>DIN Power</label>
                <input name="DIN_power" type="text" placeholder="" onChange={handleChange}></input>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}


export const ProductRD = () => {
    const [getData, setGetData] = useState({})

    const handleDelete = async (id) => {
        const res = await fetch("http://localhost:8800/cars/cars-display/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            window.location.reload()
        }
        else {
            console.log("Can't delete !")
        }
    }

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
                console.log(getRes)
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
                        <span>Model :</span>
                        <p>{car.model}</p>
                    </div>
                    <div>
                        <span>Type :</span>
                        <p>{car.type}</p>
                    </div>
                    <div className="update-delete-button">
                        <button className="delete-button" onClick={() => handleDelete(car.idcars)}>Delete</button>
                        <Link to={"/admin/products-update/" + car.idcars}><button className="update-button">Update</button></Link>
                    </div>

                </div>
            )) : ""}
        </div>
    )
}