// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import '../styles/partials/sidebar.css';

// const Sidebar = ({ links, onClose }) => {
//     return (
//         <div className="sidebar-overlay" onClick={onClose}>
//             <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//                 {links.map(link => (
//                     <Link to={link.path} key={link.name} className="sidebar-link">
//                         <FontAwesomeIcon icon={link.icon} className="sidebar-icon" />
//                         {link.name}
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import '../styles/partials/sidebar.css';

export default function Sidebar({links, close}){
    return(
        <div className="sidebar-overlay" onClick={close}>
        <div className="sidebar">
        { links.map(link => (
                <Link className="sidebar-link" to={link.path} key={link.name} onClick={close}>
                    <FontAwesomeIcon icon={link.icon} className="sidebar-icon" />
                    {link.name}
                </Link>
        ))}
            </div>
        </div>
    )
}