import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";
import useAuth from "../hooks/useAuth";
import { formatPrice } from "../utils/formatPrice";
import "./Checkout.css";

const initialForm = {
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  phone: "",
};

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrderStore((state) => state.createOrder);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Champ requis.";
    if (!form.address.trim()) nextErrors.address = "Champ requis.";
    if (!form.city.trim()) nextErrors.city = "Champ requis.";
    if (!/^\d{4,5}$/.test(form.postalCode)) nextErrors.postalCode = "Code postal invalide.";
    if (!/^[\d+ ]{8,}$/.test(form.phone)) nextErrors.phone = "Numero invalide.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length === 0 || !validate()) return;

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 700));

    createOrder({
      userId: user.id,
      items,
      total: totalPrice,
      shippingInfo: form,
    });

    clearCart();
    setIsSubmitting(false);
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="container page empty-state">
        <h3>Votre panier est vide</h3>
        <p>Ajoutez des produits avant de passer commande.</p>
        <Link to="/shop" className="btn btn-primary">
          Retour a la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Finaliser la commande</h1>

      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <h2>Adresse de livraison</h2>

          <div className={`field ${errors.fullName ? "has-error" : ""}`}>
            <label htmlFor="fullName">Nom complet</label>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className={`field ${errors.address ? "has-error" : ""}`}>
            <label htmlFor="address">Adresse</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="checkout__row">
            <div className={`field ${errors.city ? "has-error" : ""}`}>
              <label htmlFor="city">Ville</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>

            <div className={`field ${errors.postalCode ? "has-error" : ""}`}>
              <label htmlFor="postalCode">Code postal</label>
              <input
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && <span className="field-error">{errors.postalCode}</span>}
            </div>
          </div>

          <div className={`field ${errors.phone ? "has-error" : ""}`}>
            <label htmlFor="phone">Telephone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Traitement en cours..." : `Payer ${formatPrice(totalPrice)}`}
          </button>
        </form>

        <aside className="checkout__summary">
          <h3>Votre commande</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout__summary-total">
            <span>Total</span>
            <span className="price-tag price-tag--lg">{formatPrice(totalPrice)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;