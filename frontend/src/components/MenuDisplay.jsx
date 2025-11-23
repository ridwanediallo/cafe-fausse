/**
 * Menu Display Component
 * Displays a menu category with its items
 */
import PropTypes from 'prop-types';

function MenuDisplay({ category }) {
  return (
    <div className="menu-category">
      <h2 className="category-title">{category.category_name}</h2>

      <div className="menu-items-grid">
        {category.items && category.items.length > 0 ? (
          category.items.map((item) => (
            <div key={item.item_id} className="menu-item">
              <div className="menu-item-header">
                <h3 className="item-name">{item.item_name}</h3>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>

              {item.description && (
                <p className="item-description">{item.description}</p>
              )}

              {!item.is_available && (
                <span className="item-unavailable">Currently Unavailable</span>
              )}
            </div>
          ))
        ) : (
          <p className="no-items">No items in this category</p>
        )}
      </div>
    </div>
  );
}

MenuDisplay.propTypes = {
  category: PropTypes.shape({
    category_id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        item_id: PropTypes.number.isRequired,
        item_name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        is_available: PropTypes.bool,
      })
    ),
  }).isRequired,
};

export default MenuDisplay;
