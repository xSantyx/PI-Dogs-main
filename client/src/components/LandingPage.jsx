import React from "react";
import {Link} from "react-router-dom"
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className="main_container">
            <h1 className="titleApp">Mundo Perruno</h1>
            <Link to = "/Home"><button className="button_home"></button></Link>             
        </div>
    )
}