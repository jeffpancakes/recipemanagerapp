import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import '../styles/partials/navbar.css';
import '../styles/partials/sidebarButton.css';
import { useUser } from './UserContext';

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { user, setUser } = useUser();
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const links = [
        { 
            name: 'Home', 
            path: '/',
            icon: faHome
        },
        { 
            name: 'Recipes',
            path: '/recipes',
            icon: faList
        },
    ];

    if (user && !user.isAdmin) {
        links.push({
            name: 'User',
            path: '/user-dashboard',
            icon: faUser
        });
    }

    if (user && user.isAdmin) {
        links.push({
            name: 'Admin',
            path: '/admin-dashboard',
            icon: faUserShield
        });
    }

    function closeSidebar() {
        setShowSidebar(false);
    }

    const handleLogin = () => {
        setUser(selectedUser);
        navigate('/');
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    const users = [
        { id: 1, name: 'Jeff', isAdmin: false },
        { id: 2, name: 'Admin', isAdmin: true }
    ];

    return (
        <div>
            <div className="navbar container">
                <Link to="/" className="logo">RecipeManager</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link to={link.path} key={link.name} className="nav-link">
                            <FontAwesomeIcon icon={link.icon} className="nav-icon" />
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar close={closeSidebar} links={links} />}
            <div className="auth-container">
                {user ? (
                    <div>
                        <button>{user.name}</button>
                        <ul>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <select
                            value={selectedUser ? selectedUser.id : ''}
                            onChange={(e) =>
                                setSelectedUser(
                                    users.find((user) => user.id === parseInt(e.target.value))
                                )
                            }
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleLogin} disabled={!selectedUser}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}