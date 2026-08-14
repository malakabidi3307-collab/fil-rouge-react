import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__logo">ShopEase</p>
          <p className="site-footer__tagline">
            Des objets choisis, pensés pour durer plutôt que pour s'accumuler.
          </p>
        </div>

        <div className="site-footer__col">
          <h4>Boutique</h4>
          <Link to="/shop">Tous les produits</Link>
          <Link to="/wishlist">Favoris</Link>
        </div>

        <div className="site-footer__col">
          <h4>Compte</h4>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
          <Link to="/profile">Mes commandes</Link>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {year} ShopEase.</span>
      </div>
    </footer>
  );
}

export default Footer;