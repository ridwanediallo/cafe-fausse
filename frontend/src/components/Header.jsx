import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, RESTAURANT_INFO } from '../utils/constants';
import '../styles/Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>{RESTAURANT_INFO.name}</h1>
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-contact">
          <a href={`tel:${RESTAURANT_INFO.phone}`} className="phone-link">
            {RESTAURANT_INFO.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
