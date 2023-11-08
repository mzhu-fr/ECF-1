import React, { useContext, useState } from 'react'
import { UserLogin } from './UserLogin'
import { UserRegister } from './UserRegister'
import { AdminLogin } from './AdminLogin'
import { AuthContext } from '../../context/AuthentificationContext'
import { Link, Navigate } from 'react-router-dom'

export const LoginRegister = () => {

    const [loginState, setLoginState] = useState(false);
    const [registerState, setRegisterState] = useState(true);

    const { currentUser } = useContext(AuthContext);

    const handleLoginClick = () => {
        setLoginState(true)
        setRegisterState(false)
    }
    const handleRegisterClick = () => {
        setLoginState(false);
        setRegisterState(true);
    }
    if (currentUser) {
        return <Navigate to="/" />
    }
    return (
        <div className="connexion-page">
            <div className="header-register-login">
                <div className={"header-details " + (loginState ? "active" : "")} onClick={handleLoginClick}>Login</div>
                <div className={"header-details " + (registerState ? "active" : "")} onClick={handleRegisterClick}>Register</div>
            </div>
            <div className="display-form">
                {loginState && <UserLogin />}
                {registerState && <UserRegister />}
            </div>
            <p className="redirect-admin">Are you an employee ? <Link to="/admin-login"> Connect here</Link></p>
        </div>
    )
}
