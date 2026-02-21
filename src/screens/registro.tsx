import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/HomeScreen.css";
import fondo from "../assets/FondoLogin.png";

const RegistroScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="overlay">
        <div className="login-card">
          <h2>Registro de Usuario</h2>

          <div className="input-group">
            <label>Nombre Completo</label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" required />
          </div>

          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <input type="password" required />
          </div>

          <button className="login-button">Registrarse</button>

          {/* Texto para volver al login */}
          <p className="register-text">
            ¿Ya tienes cuenta?{" "}
            <span className="register-link" onClick={handleLoginRedirect}>
              Inicia sesión
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistroScreen;