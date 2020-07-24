import React from 'react';
import { Link } from "react-router-dom"
import "./LinkBar.css"

export default function LinkBar(props) {
    return <div className="linkBar">
        {props.links.map(link => (
            <Link key={link.link} to={link.link}>
                <div className="linkBarItem">{link.text}</div>
            </Link>))}
    </div>
}