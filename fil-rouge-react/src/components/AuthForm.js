import React, { useState } from "react";
import "./AuthForm.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthForm({ mode, onSubmit, isLoading, serverError }) {
  const isRegister = mode === "register";

  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};

    if (isRegister && values.name.trim().length < 2) {
      errors.name = "Veuillez indiquer votre nom.";
    }
    if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Adresse email invalide.";
    }
    if (values.password.length < 6) {
      errors.password = "6 caracteres minimum.";
    }
    if (isRegister && values.confirmPassword !== values.password) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {serverError && <div className="form-banner form-banner--error">{serverError}</div>}

      {isRegister && (
        <div className={`field ${fieldErrors.name ? "has-error" : ""}`}>
          <label htmlFor="name">Nom complet</label>
          <input id="name" name="name" type="text" value={values.name} onChange={handleChange} />
          {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
        </div>
      )}

      <div className={`field ${fieldErrors.email ? "has-error" : ""}`}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={values.email} onChange={handleChange} />
        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
      </div>

      <div className={`field ${fieldErrors.password ? "has-error" : ""}`}>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
      </div>

      {isRegister && (
        <div className={`field ${fieldErrors.confirmPassword ? "has-error" : ""}`}>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {fieldErrors.confirmPassword && (
            <span className="field-error">{fieldErrors.confirmPassword}</span>
          )}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
        {isLoading ? "Veuillez patienter..." : isRegister ? "Creer mon compte" : "Se connecter"}
      </button>
    </form>
  );
}

export default AuthForm;