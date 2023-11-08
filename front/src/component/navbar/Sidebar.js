import React from 'react';

import { NavbarContent } from './Navbar-content';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCloseSquare } from 'react-icons/ai';

import { hideSidebar } from '../../redux-store/actions/sidebar-action';

import './navbar.css';

export const Sidebar = () => {
    const sidebar = useSelector((state) => state.sidebar)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("close sidebar")
        dispatch(hideSidebar());
    }
    return (
        <div className="sidebar" id={sidebar ? "display-sidebar" : "hide-sidebar"}>
            <div className="close-sidebar">
                <AiFillCloseSquare onClick={() => { handleClick() }} />
            </div>
            <div className="sidebar-links-list">
                <NavbarContent />
            </div>
        </div>
    )
}
