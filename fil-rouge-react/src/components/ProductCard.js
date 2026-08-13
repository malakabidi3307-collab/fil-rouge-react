import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { formatPrice } from "../utils/formatPrice";
import "./ProductCard.css";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isFavorite = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleAddToCart = (event) => {
    event.preventDefault();
    addItem(product);
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        <button
          type="button"
          className={`product-card__fav ${isFavorite ? "is-active" : ""}`}
          onClick={handleToggleWishlist}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          ♥
        </button>

        <button type="button" className="product-card__quick-add" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <span className="price-tag">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}

export default ProductCard;