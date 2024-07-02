import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { useUser } from "./UserContext";
import '../styles/partials/navbar.css';
import '../styles/partials/sidebarButton.css';

export default function Navbar() {
    const { user, setUser } = useUser();
    const [showSidebar, setShowSidebar] = useState(false);
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

    const handleLogin = () => {
        setUser(selectedUser);
    };

    const handleLogout = () => {
        setUser(null);
        setSelectedUser(null);
    };

    const users = [
        { id: 1, name: 'User', isAdmin: false },
        { id: 2, name: 'Admin', isAdmin: true }
    ];

    function closeSidebar() {
        setShowSidebar(false);
    };

    const handleDashboardClick = () => {
        if (user) {
            navigate(user.isAdmin ? '/admin-dashboard' : '/user-dashboard');
        }
    };

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
                <div className="user-section">
                    {user ? (
                        <div className="user-info">
                            <FontAwesomeIcon icon={user.isAdmin ? faUserShield : faUser} className="user-icon" />
                            <span>{user.name}</span>
                            <button className="dashboard-button" onClick={handleDashboardClick}>
                                {user.isAdmin ? 'Admin' : 'User'}
                            </button>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="login-section">
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
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            { showSidebar && <Sidebar close={closeSidebar} links={links} />}
        </div>
    );
}
