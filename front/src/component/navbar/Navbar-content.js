// IMPORT FILES
import './navbar.css';
import { AuthContext } from '../../context/AuthentificationContext.js'

// IMPORT MODULES
import { useContext } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { hideSidebar } from '../../redux-store/actions/sidebar-action.js';

export const NavbarContent = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log("close sidebard after click on menu")
        dispatch(hideSidebar())
    }
    const handleLogout = async () => {
        try {
            await logout();
            handleClick();
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="navbar-content-links">
            <Link to="/" onClick={() => handleClick()}>Home</Link>
            {currentUser ? "" : <Link to="/register-login" onClick={() => handleClick()}>Register/Login</Link>}
            {currentUser ? <Link to="/profile" onClick={() => handleClick()}>Profile</Link> : ""}
            {currentUser && currentUser.picture && (currentUser.status === "employed") ? <Link to="/" onClick={() => handleClick()}>Admin</Link> : ""}

            {currentUser ? <Link to="/" onClick={() => handleLogout()}>Logout</Link> : ""}
            <Link to="/about-us" onClick={() => handleClick()}>About Us</Link>
        </div>
    )
}