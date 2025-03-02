import { NavLink } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
  return (
    <ul className="navbar-wrapper">
      <NavLink
        to="/"
        className={(nav) => (nav.isActive ? 'nav-item active' : 'nav-item')}
      >
        <li className="nav-item">Accueil</li>
      </NavLink>
      <NavLink
        to="/About"
        className={(nav) => (nav.isActive ? 'nav-item active' : 'nav-item')}
      >
        <li className="nav-item">A propos</li>
</NavLink>
    </ul>
  );
};

export default Navigation;

