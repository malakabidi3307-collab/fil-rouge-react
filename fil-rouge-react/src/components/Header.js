import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCartStore } from "../store/useCartStore";
import useAuth from "../hooks/useAuth";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openDrawer = useCartStore((state) => state.openDrawer);
  const { user, isAuthenticated, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo">
          ShopEase
        </Link>

        <nav className="site-header__nav">
          <Link to="/">Accueil</Link>
          <Link to="/shop">Boutique</Link>
          <Link to="/wishlist">Favoris</Link>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__cart"
            onClick={openDrawer}
            aria-label="Ouvrir le panier"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="site-header__badge">{totalItems}</span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="site-header__user">
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-[#1B2B22] text-[#F6F4EF] flex items-center justify-center font-semibold text-sm hover:opacity-90 transition"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={`Menu de ${user.name}`}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {isMenuOpen && (
                <div className="site-header__dropdown">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    Mon profil
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    Mes commandes
                  </Link>
                  <button type="button" onClick={handleLogout}>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="site-header__auth-links">
              <Link to="/login">Connexion</Link>
              <Link
                to="/register"
                className="btn btn-outline site-header__register-btn"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H18" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

export default Header;
