import React from "react";
import { Link } from "react-router-dom";
import '../styles/partials/navbar.css';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Recipes', path: '/recipes' },
];

export default function Navbar() {
    return (
        <div className="navbar container">
            <Link to="/" className="logo">RecipeManager</Link>
            <div className="nav-links">
                { links.map(link => (
                    <Link key={link.name} to={link.path} className="nav-link">{link.name}</Link>
                ))}
            </div>
            <form className="d-flex" role="search">
                <input className="search-box" type="search" placeholder="Search" aria-label="Search" />
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
}
