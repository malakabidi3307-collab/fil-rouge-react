import React from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { useOrderStore } from "../store/useOrderStore";
import { formatPrice } from "../utils/formatPrice";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const orders = useOrderStore((state) => state.getOrdersByUser(user.id));

  return (
    <div className="container page">
      <div className="profile-header">
        <div>
          <span className="eyebrow">Mon compte</span>
          <h1>Bonjour, {user.name.split(" ")[0]}</h1>
          <p className="profile-header__email">{user.email}</p>
        </div>

        <button type="button" className="btn btn-outline" onClick={logout}>
          Se déconnecter
        </button>
      </div>

      <section className="profile-orders">
        <h2>Mes commandes</h2>

        {orders.length === 0 ? (
          <div className="empty-state">
            <h3>Aucune commande pour l'instant</h3>
            <p>Vos commandes passées apparaîtront ici.</p>
            <Link to="/shop" className="btn btn-primary">
              Parcourir la boutique
            </Link>
          </div>
        ) : (
          <ul className="profile-orders__list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-card__header">
                  <div>
                    <p className="order-card__id">Commande {order.id}</p>
                    <p className="order-card__date">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="order-card__status">{order.status}</span>
                </div>

                <ul className="order-card__items">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className="order-card__footer">
                  <span>Livré à {order.shippingInfo.city}</span>
                  <span className="price-tag">{formatPrice(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Profile;