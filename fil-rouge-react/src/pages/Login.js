import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";
import "../components/AuthForm.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();
  const redirectTo = location.state?.from || "/profile";
  const handleSubmit = async (values) => {
    const result = await login(values);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1>Connexion</h1>
          <p>Retrouvez votre panier, vos favoris et vos commandes.</p>
        </div>

        <AuthForm mode="login" onSubmit={handleSubmit} isLoading={isLoading} serverError={error} />

        <p className="auth-card__switch">
          Pas encore de compte ?{" "}
          <Link to="/register" onClick={clearError}>
            Creer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;