import React from "react";
import { categories } from "../data/products";
import "./Filters.css";

const sortOptions = [
  { value: "default", label: "Tri par defaut" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix decroissant" },
  { value: "rating-desc", label: "Meilleures notes" },
];

function Filters({ activeCategory, onCategoryChange, sortBy, onSortChange }) {
  return (
    <div className="filters">
      <div className="filters__categories">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            className={`filters__chip ${activeCategory === category.value ? "is-active" : ""}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <select
        className="filters__sort"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        aria-label="Trier les produits"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
