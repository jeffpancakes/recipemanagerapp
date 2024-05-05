import { Link } from "react-router-dom";

const links = [
  { name: 'Home', path: '/' },
  { name: 'Recipes', path: '/recipes' },
];

export default function Navbar(){
    return (
        <div className="navbar container">
            <Link to="/" className="logo">RecipeManager</Link>
            <div className="nav-links">
                { links.map(link => (
                    <Link key={link.name} to={link.path} className="nav-link">{link.name}</Link>
                ))}
            </div>
        </div>
    );
}
