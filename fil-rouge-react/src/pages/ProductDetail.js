import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import products from "../data/products";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { formatPrice } from "../utils/formatPrice";
import ProductGrid from "../components/ProductGrid";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === id);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isFavorite = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );

  if (!product) {
    return (
      <div className="container page empty-state">
        <h3>Produit introuvable</h3>
        <p>Ce produit n'existe plus ou a ete retire de la boutique.</p>
        <button type="button" className="btn btn-outline" onClick={() => navigate("/shop")}>
          Retour a la boutique
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container page">
      <Link to="/shop" className="product-detail__back">
        ← Retour a la boutique
      </Link>

      <div className="product-detail">
        <div className="product-detail__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail__info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <span className="price-tag price-tag--lg">{formatPrice(product.price)}</span>

          <p className="product-detail__description">{product.description}</p>

          <p className="product-detail__stock">
            {product.stock > 0 ? `${product.stock} en stock` : "Rupture de stock"}
          </p>

          <div className="product-detail__actions">
            <div className="product-detail__qty">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addItem(product, quantity)}
              disabled={product.stock === 0}
            >
              Ajouter au panier
            </button>

            <button
              type="button"
              className={`btn btn-outline ${isFavorite ? "is-active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {isFavorite ? "♥ Dans mes favoris" : "♡ Ajouter aux favoris"}
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="product-detail__related">
          <h2>Vous aimerez aussi</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}

export default ProductDetail;