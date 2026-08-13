import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";
import { formatPrice } from "../utils/formatPrice";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const lastOrder = useOrderStore((state) => state.lastOrder);
  if (!lastOrder) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="container page confirmation">
      <div className="confirmation__icon">✓</div>
      <h1>Merci pour votre commande !</h1>
      <p>
        Votre commande <strong>{lastOrder.id}</strong> a bien ete enregistree.
        Un recapitulatif vous a ete envoye par email (simulation).
      </p>

      <div className="confirmation__summary">
        <div className="confirmation__row">
          <span>Total paye</span>
          <span className="price-tag price-tag--lg">{formatPrice(lastOrder.total)}</span>
        </div>
        <div className="confirmation__row">
          <span>Livraison a</span>
          <span>
            {lastOrder.shippingInfo.address}, {lastOrder.shippingInfo.city}
          </span>
        </div>
      </div>

      <div className="confirmation__actions">
        <Link to="/profile" className="btn btn-outline">
          Voir mes commandes
        </Link>
        <Link to="/shop" className="btn btn-primary">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;