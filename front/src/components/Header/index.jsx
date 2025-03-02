import { useState, useEffect } from "react";
import "./header.css" 
import { NavLink } from "react-router-dom";
import { userService } from "../../utils/userService";
import Navigation from '../Navigation'

function Header() {

  const [user, setUser] = useState(null);
  
  // Utilisation du hook useEffect pour souscrire aux changements de l'utilisateur  
  useEffect(() => {
        // Abonnement aux mises à jour de l'utilisateur à l'aide du service userService
        const subscription = userService.user.subscribe((x) => setUser(x));

        // Nettoyage de l'abonnement lors de la destruction du composant
        return () => subscription.unsubscribe();
  }, []);

  const logout = () => {
    userService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>Home</NavLink>
             
              </li>
            {user ? (<> <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink to="/" onClick={logout} activeClassName="active" role="menuitem">
                            Se déconnecter
              </NavLink>
            </>
            ): (
            <>
              <NavLink to={"/signin"} activeClassName="active" role="menuitem">
              Connexion
              </NavLink>
              <NavLink to={"/signup"} activeClassName="active" role="menuitem">
              Inscription
              </NavLink>
            </>
            )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header