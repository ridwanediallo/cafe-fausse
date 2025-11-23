import { useState, useEffect } from 'react';
import menuService from '../services/menuService';
import MenuDisplay from '../components/MenuDisplay';
import '../styles/Menu.css';

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuService.getMenu();
      setMenu(data);
    } catch (err) {
      setError(err.message || 'Failed to load menu. Please try again later.');
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading our delicious menu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="message error">
            <h3>Oops!</h3>
            <p>{error}</p>
            <button onClick={fetchMenu} className="btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="container">
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-subtitle">
            Discover our carefully crafted dishes, made with the finest locally sourced ingredients
          </p>
        </div>
      </div>

      <div className="container">
        <div className="menu-content">
          {menu.length === 0 ? (
            <p className="text-center">No menu items available at the moment.</p>
          ) : (
            menu.map((category) => (
              <MenuDisplay key={category.category_id} category={category} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
