import React from "react";
import "./Loader.css";

function Loader({ size = "md", label }) {
  return (
    <div className={`loader loader--${size}`} role="status" aria-live="polite">
      <span className="loader__spinner" />
      {label && <span className="loader__label">{label}</span>}
    </div>
  );
}

export default Loader;