import React from "react";
import { Link } from "react-router-dom";
import logo from "../pages/img/logo.png"


export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-title">
                <div className="logo-img">
                    <img src={logo} alt="" />
                </div>
                <div className="title-text">
                    <div className="big-title">Budget Management</div>
                    <div className="small-title">Make it easier</div>
                </div>
            </div>
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to='/'>
                        <span> 홈으로 </span>
                    </Link>
                    <Link to='/rqm'>
                        <span> 청구관리 </span>
                    </Link>
                    <Link to='/bgd'>
                        <span> 예산입금 </span>
                    </Link>
                    <Link to='/bgs'>
                        <span> 예산현황 </span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}