import { Link } from "react-router-dom"

export const NavbarContent = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Login/Register</Link>
            <Link to="/">Admin</Link>
            <Link to="/">Profile</Link>
            <Link to="/">Create new items</Link>
            <Link to="/">Logout</Link>
        </div>
    )
}