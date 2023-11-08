import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthentificationContext';

export const EmployeeUpdate = () => {
    const location = useLocation()
    const idEmployee = location.pathname.split("/")[3];

    const [message, setMessage] = useState()

    const navigate = useNavigate()

    console.log(idEmployee)

    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    const [getInfo, setGetInfo] = useState({
        name: "",
        fam_name: "",
        birth: "",
        adress: "",
        zipcode: "",
        phone: "",
        social_security: "",
        gender: "F",
        updated: getDate(),
        pay: "",
        email: ""
    })

    const [inputs, setInputs] = useState({
        name: "",
        fam_name: "",
        birth: "",
        adress: "",
        zipcode: "",
        phone: "",
        social_security: "",
        gender: "",
        updated: getDate(),
        pay: "",
        email: ""
    })

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:8800/employee/me/" + idEmployee, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                console.log("RES NOT OK")
            }
            else {
                const getRes = await res.json()
                if (getRes[0]) {
                    setGetInfo({
                        name: getRes[0].name,
                        fam_name: getRes[0].fam_name,
                        birth: getRes[0].birth,
                        adress: getRes[0].adress,
                        zipcode: getRes[0].zipcode,
                        phone: getRes[0].phone,
                        social_security: getRes[0].social_security,
                        gender: getRes[0].gender,
                        updated: getDate(),
                        pay: getRes[0].pay,
                        email: getRes[0].email
                    })
                    setInputs({
                        name: getRes[0].name,
                        fam_name: getRes[0].fam_name,
                        birth: getRes[0].birth,
                        adress: getRes[0].adress,
                        zipcode: getRes[0].zipcode,
                        phone: getRes[0].phone,
                        social_security: getRes[0].social_security,
                        gender: getRes[0].gender,
                        updated: getDate(),
                        pay: getRes[0].pay,
                        email: getRes[0].email
                    })
                    return;
                }
            }
        };
        getData()
    }, [])

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleClickUpdate = async (e) => {
        e.preventDefault();

        console.log(inputs);
        const res = await fetch("http://localhost:8800/employee/update/" + idEmployee, {
            method: "PUT",
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(inputs)
        if (!res.ok) {
            const getStat = await res.json()
            console.log("res not ok")
            console.log(getStat)
            console.log("res not ok")
        }
        else {
            const getStatus = await res.json()
            navigate("/admin")
        }
    }
    console.log(inputs)
    return (
        <div className="employee-CRUD">
            <h1>Update employee</h1>
            <div className="employee-update">
                {message && <p>{message}</p>}
                <div className="form-section">
                    <label>Name :</label>
                    <input type="text" defaultValue={getInfo.name} placeholder="First Name" name="name" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Last Name :</label>
                    <input type="text" defaultValue={getInfo.fam_name} placeholder="Last Name" name="fam_name" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Birth date :</label>
                    <input type="text" defaultValue={getInfo.birth} placeholder="Format DD/MM/YYYY" name="birth" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Adress :</label>
                    <input type="text" defaultValue={getInfo.adress} placeholder="Adress" name="adress" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Zipcode :</label>
                    <input type="text" defaultValue={getInfo.zipcode} placeholder="Zipcode" name="zipcode" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Phone number :</label>
                    <input type="text" defaultValue={getInfo.phone} placeholder="Phone number" name="phone" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Social Security Number : </label>
                    <input type="text" defaultValue={getInfo.social_security} placeholder="Social Security" name="social_security" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Gender</label>
                    <select value="S" type="text" defaultValue={getInfo.gender} name="gender" onChange={handleChange}>
                        <option value="F">F</option>
                        <option value="M">M</option>
                        <option value="NB">NB</option>
                    </select>
                </div>
                <div className="form-section">
                    <label>Monthly Pay :</label>
                    <input name="pay" defaultValue={getInfo.pay} placeholder="Monthly Pay" type="number" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Email :</label>
                    <input type="text" defaultValue={getInfo.email} placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <button className="submit-form" onClick={handleClickUpdate}>Submit Informations</button>
            </div>
        </div>
    )
}


export const UserUpdate = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const idUser = location.pathname.split("/")[3]
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        fam_name: ""
    })

    const [message, setMessage] = useState()
    const handleChange = (e) => {
        setMessage()
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8800/users/all/user/" + idUser, {
            method: "PUT",
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
            navigate("/admin")
        }
    }
    return (
        <div>
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

                <button type="button" className="update-button" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    )
}

export const ProductUpdate = () => {
    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const location = useLocation()

    const carId = location.pathname.split("/")[3]
    console.log(carId)

    const [inputs, setInputs] = useState({
    })

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:8800/cars/cars-display/" + carId, {
            method: "PUT",
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            navigate("/admin")
        }
        else {
            console.log("There was a problem when registering, please retry")
        }
    }

    if (currentUser && currentUser.grade === "admin") {
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

    else {
        return <Navigate to="/"></Navigate>
    }
}