import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";
import "./Home.css";

function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="eyebrow">Nouvelle selection</span>
            <h1>
              Des objets choisis,
              <br />
              pour un quotidien plus simple.
            </h1>
            <p>
              ShopEase reunit une petite selection de sacs, d'accessoires et
              d'objets pour la maison, pensee pour durer plutot que pour
              s'accumuler.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Decouvrir la boutique
            </Link>
          </div>

          <div className="hero__image">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
              alt="Selection d'objets ShopEase"
            />
          </div>
        </div>
      </section>

      <section className="container page">
        <div className="section-heading">
          <h2>Les incontournables</h2>
          <Link to="/shop" className="section-heading__link">
            Voir toute la boutique →
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}

export default Home;
