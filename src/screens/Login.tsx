import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/HomeScreen.css";
import fondo from "../assets/FondoLogin.png";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin");
  };

  const handleLoginSp = () => {
    navigate("/admin-sp");
  };

  const handleRegister = () => {
    navigate("/registro");
  };

  const handleGoogleLogin = () => {
    // Aquí después puedes integrar Firebase o Google Auth real
    console.log("Login con Google");
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="overlay">
        <div className="login-card">
          <h2>Inicio de Sesión</h2>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" required />
          </div>

          <button className="login-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>

          <button className="login-button" onClick={handleLoginSp}>
            Iniciar Sesión SP
          </button>

          {/* Botón Google */}
          <button className="google-button" onClick={handleGoogleLogin}>
            Iniciar sesión con Google
          </button>

          {/* Texto de registro */}
          <p className="register-text">
            ¿No tienes cuenta?{" "}
            <span className="register-link" onClick={handleRegister}>
              Regístrate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;