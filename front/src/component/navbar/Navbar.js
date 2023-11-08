// IMPORT ICONS
import { CgMenuGridR } from 'react-icons/cg'
import { FaTools } from 'react-icons/fa';

// IMPORT MODULES
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// IMPORT FILES
import './navbar.css'
import { showSidebar } from "../../redux-store/actions/sidebar-action";
import { NavbarContent } from "./Navbar-content";

export const Navbar = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        console.log("show sidebar")
        dispatch(showSidebar());
    }
    return (
        <div className="navbar-wrapper">
            <div className="logo-name">
                <Link to="/" className="website-name-logo"><FaTools className="logo" />GarageMasters</Link>
            </div>
            <div className="navbar-content">
                <NavbarContent />
            </div>
            <div onClick={() => { handleClick() }} className="burger-menu">< CgMenuGridR /></div>
        </div>
    )
}
