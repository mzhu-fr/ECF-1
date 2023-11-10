import React, { useContext, useState } from 'react'
import './admin.css'
import { EmployeeCREATE, EmployeeRD } from './Employee-CRUD'
import { AuthContext } from '../../context/AuthentificationContext'
import { Navigate } from 'react-router-dom'
import { UserCreate, UserRD } from './User-CRUD'
import { ProductCreate, ProductRD } from './Product-CRUD'

export const Admin = () => {
    const { currentUser } = useContext(AuthContext);
    const [userActive, setUserActive] = useState(false);
    const [employeeActive, setEmployeeActive] = useState(false);
    const [productActive, setProductActive] = useState(false)

    const handleUser = () => {
        setUserActive(true);
        setEmployeeActive(false);
        setProductActive(false)
    }
    const handleEmployee = () => {
        setUserActive(false);
        setEmployeeActive(true)
        setProductActive(false)
    }
    const handleProducts = () => {
        setProductActive(true)
        setEmployeeActive(false)
        setUserActive(false)
    }
    if (currentUser && currentUser.grade === "admin") {
        return (
            <div className="admin">
                <div className="admin-div-button">
                    <div className={"user-employee-button " + (userActive ? "active" : "")} onClick={handleUser}>User</div>
                    <div className={"user-employee-button " + (employeeActive ? "active" : "")} onClick={handleEmployee}>Employee</div>
                    <div className={"user-employee-button " + (productActive ? "active" : "")} onClick={handleProducts}>Products</div>
                </div>
                <div className="admin-display-crud">
                    <div className="create-section">
                        {userActive ? < UserCreate /> : ""}

                        {productActive ? <ProductCreate /> : ""}

                        {employeeActive ? < EmployeeCREATE /> : ""}

                    </div>
                    <div className="display-section">
                        {userActive ? < UserRD /> : ""}
                        {productActive ? <ProductRD /> : ""}
                        {employeeActive ? < EmployeeRD /> : ""}
                    </div>
                </div>
            </div >
        )
    }
    else {
        return <Navigate to="/"></Navigate>
    }
}
