import React, { useMemo, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";
import "./Shop.css";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const handleSearch = useCallback((term) => setSearchTerm(term), []);
  const visibleProducts = useMemo(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [category, searchTerm, sortBy]);

  return (
    <div className="container page">
      <div className="shop-header">
        <h1>La boutique</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <Filters
        activeCategory={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <p className="shop-count">{visibleProducts.length} produit(s)</p>

      <ProductGrid products={visibleProducts} />
    </div>
  );
}

export default Shop;