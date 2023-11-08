import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const userLogin = async (inputs) => {
        const res = await axios.post("http://localhost:8800/auth/login", inputs);
        setCurrentUser(res.data)
    }

    const adminLogin = async (inputs) => {
        const response = await axios.post("http://localhost:8800/auth/admin-connect", inputs)
        setCurrentUser(response.data)
    }

    const logout = async () => {
        const res = await axios.post("http://localhost:8800/auth/logout");
        setCurrentUser(null);
        console.log(res);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])
    return (
        <AuthContext.Provider value={{ userLogin, adminLogin, logout, currentUser }}> {children} </AuthContext.Provider>
    )
}
