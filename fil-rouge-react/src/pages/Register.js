import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";
import "../components/AuthForm.css";

function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (values) => {
    const result = await register(values);
    if (result.success) {
      navigate("/profile", { replace: true });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1>Creer un compte</h1>
          <p>Rejoignez ShopEase pour suivre vos commandes.</p>
        </div>

        <AuthForm mode="register" onSubmit={handleSubmit} isLoading={isLoading} serverError={error} />

        <p className="auth-card__switch">
          Deja un compte ?{" "}
          <Link to="/login" onClick={clearError}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;