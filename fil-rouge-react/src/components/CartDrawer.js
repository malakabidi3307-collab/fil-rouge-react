import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../utils/formatPrice";
import "./CartDrawer.css";

function CartDrawer() {
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const items = useCartStore((state) => state.items);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (!isOpen) return null;

  return (
    <div className="cart-drawer__overlay" onClick={closeDrawer}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Panier"
      >
        <div className="cart-drawer__header">
          <h3>Votre panier</h3>
          <button type="button" onClick={closeDrawer} aria-label="Fermer le panier">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <h3>Votre panier est vide</h3>
            <p>Parcourez la boutique pour trouver votre bonheur.</p>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer__item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-drawer__item-info">
                    <p className="cart-drawer__item-name">{item.name}</p>
                    <span className="price-tag">{formatPrice(item.price)}</span>

                    <div className="cart-drawer__qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-drawer__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Retirer ${item.name}`}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Sous-total</span>
                <span className="price-tag price-tag--lg">{formatPrice(totalPrice)}</span>
              </div>
              <Link to="/cart" className="btn btn-outline btn-block" onClick={closeDrawer}>
                Voir le panier
              </Link>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={closeDrawer}>
                Commander
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;