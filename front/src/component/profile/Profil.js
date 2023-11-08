import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthentificationContext'
import { Navigate } from 'react-router-dom';

export const Profil = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/" />
    }
    return (
        <div className="profile-page">

        </div>
    )
}
