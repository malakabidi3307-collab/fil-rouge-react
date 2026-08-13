import React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>Aucun produit ne correspond a votre recherche</h3>
        <p>Essayez d'ajuster vos filtres ou votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;