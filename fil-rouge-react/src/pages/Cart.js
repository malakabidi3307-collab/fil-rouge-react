import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../utils/formatPrice";
import "./Cart.css";

function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <div className="container page empty-state">
        <h3>Votre panier est vide</h3>
        <p>Ajoutez des produits depuis la boutique pour les retrouver ici.</p>
        <Link to="/shop" className="btn btn-primary">
          Parcourir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Votre panier</h1>

      <div className="cart-page">
        <ul className="cart-page__list">
          {items.map((item) => (
            <li key={item.id} className="cart-page__row">
              <img src={item.image} alt={item.name} />

              <div className="cart-page__info">
                <p className="cart-page__name">{item.name}</p>
                <span className="price-tag">{formatPrice(item.price)}</span>
              </div>

              <div className="cart-page__qty">
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <p className="cart-page__line-total">{formatPrice(item.price * item.quantity)}</p>

              <button
                type="button"
                className="cart-page__remove"
                onClick={() => removeItem(item.id)}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-page__summary">
          <h3>Recapitulatif</h3>
          <div className="cart-page__summary-row">
            <span>Sous-total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="cart-page__summary-row">
            <span>Livraison</span>
            <span>Offerte</span>
          </div>
          <div className="cart-page__summary-row cart-page__summary-row--total">
            <span>Total</span>
            <span className="price-tag price-tag--lg">{formatPrice(totalPrice)}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-block">
            Passer la commande
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;