import React from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/useWishlistStore";
import ProductGrid from "../components/ProductGrid";

function Wishlist() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="container page">
      <h1>Mes favoris</h1>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>Vous n'avez pas encore de favoris</h3>
          <p>Cliquez sur le cœur d'un produit pour l'ajouter ici.</p>
          <Link to="/shop" className="btn btn-primary">
            Parcourir la boutique
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}

export default Wishlist;