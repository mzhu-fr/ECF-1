import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export const EmployeeCREATE = () => {
    const birthRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/i;


    const pictureId = Math.round(Math.random() * 8);

    const navigate = useNavigate();

    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    const [message, setMessage] = useState()

    const [inputs, setInputs] = useState({
        name: "",
        fam_name: "",
        birth: "",
        adress: "",
        zipcode: "",
        phone: "",
        social_security: "",
        gender: "F",
        picture: pictureId,
        updated: getDate(),
        pay: "",
        email: "",
        password: "123456"
    })
    const handleChange = (e) => {
        setMessage()
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if ((inputs.social_security || inputs.phone || inputs.email || inputs.pay || inputs.email) < 1) {
            setMessage("Please fill in the blank.")
            return;
        }
        if (!emailRegex.test(inputs.email)) {
            setMessage("Please enter a valid format for the email adress.")
            return;
        }
        if (!birthRegex.test(inputs.birth)) {
            setMessage("Please enter a valid format for the birth date.")
            return;
        }
        else {
            try {
                const res = await fetch("http://localhost:8800/employee", {
                    method: 'POST',
                    body: JSON.stringify(inputs),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log(res)
                if (!res.ok) {
                    const getRes = await res.json()
                    setMessage(getRes)
                }
                else {
                    setMessage("New employee has been created !")
                    window.location.reload()
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="employee-CRUD">
            <h1>Create employee</h1>
            <div className="employee-create">
                {message && <p>{message}</p>}
                <div className="form-section">
                    <label>Name :</label>
                    <input placeholder="First Name" type="text" name="name" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Last Name :</label>
                    <input placeholder="Last Name" type="text" name="fam_name" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Birth date :</label>
                    <input placeholder="Format DD/MM/YYYY" type="text" name="birth" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Adress :</label>
                    <input placeholder="Adress" type="text" name="adress" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Zipcode :</label>
                    <input placeholder="Zipcode" type="text" name="zipcode" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Phone number :</label>
                    <input placeholder="Phone number" type="text" name="phone" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Social Security Number : </label>
                    <input placeholder="Social Security" type="text" name="social_security" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Gender</label>
                    <select name="gender" onChange={handleChange}>
                        <option value="F">F</option>
                        <option value="M">M</option>
                        <option value="NB">NB</option>
                    </select>
                </div>
                <div className="form-section">
                    <label>Monthly Pay :</label>
                    <input placeholder="Monthly Pay" type="number" name="pay" onChange={handleChange} />
                </div>
                <div className="form-section">
                    <label>Email :</label>
                    <input placeholder="Email" type="text" name="email" onChange={handleChange} />
                </div>
                <button className="submit-form" onClick={handleClick}>Submit Informations</button>
            </div>
        </div>
    )
}


export const EmployeeRD = () => {

    const [getEmployee, setGetEmployee] = useState([])
    const [message, setMessage] = useState()

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:8800/employee/admin", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                setMessage("Employee couldn't be loaded")
            }
            else {
                const getAllEmployee = await res.json()
                setGetEmployee(getAllEmployee);
            }
        };
        getData()
    })

    const handleAdmin = async (id) => {
        const res = await fetch("http://localhost:8800/employee/admin/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            console.log("Update didn't work");
        }
        else {
            console.log("Update done");
            window.location.reload();
        }
    }

    return (
        <div className="employee-CRUD">
            <h1>All employees</h1>
            <div className="employee-read-delete">
                {getEmployee[0] ? getEmployee.map(employee => (
                    <div className="employee-display-unique" key={employee.idemployee}>
                        <div className="display-section">
                            <div>
                                <span>Name :</span>
                                <p>{employee.name}</p>
                            </div>
                            <div>
                                <span>Last Name :</span>
                                <p>{employee.fam_name}</p>
                            </div>
                        </div>
                        <div>
                            <span>Birth :</span>
                            <p>{employee.birth}</p>
                        </div>
                        <div className="display-section">
                            <div>
                                <span>Email :</span>
                                <p>{employee.email}</p>
                            </div>
                            <div>
                                <span>Created :</span>
                                <p>{employee.created.split("T")[0]}</p>
                            </div>
                        </div>
                        <div className="display-section">
                            <div>
                                <span>Creditation :</span>
                                <p>{employee.grade}</p>
                            </div>
                            <div>
                                <span>Pay :</span>
                                <p>{employee.pay}</p>
                            </div>
                        </div>

                        <div className="display-section">
                            <div>
                                <span>Social Security N° :</span>
                                <p>{employee.social_security}</p>
                            </div>
                            <div>
                                <span>Phone :</span>
                                <p>{employee.phone}</p>
                            </div>
                        </div>

                        <div>
                            <span>Work role :</span>
                            <p>{employee.role}</p>
                        </div>

                        <div>
                            <span>Current status :</span>
                            <p>{employee.status}</p>
                        </div>
                        <div>
                            <span>Last updated :</span>
                            <p>{employee.updated}</p>
                        </div>
                        <div className="update-delete-button">
                            <button className="admin-button" onClick={() => handleAdmin(employee.idemployee)}>Make Admin</button>
                            <Link to={"/admin/employee-update/" + employee.idemployee}><button className="update-button">Update</button></Link>
                        </div>
                    </div>
                )) : ""}
            </div>
        </div>
    )
}