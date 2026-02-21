import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeScreen.css";
import fondo from "../assets/FondoInicio.png";
import logo from "../assets/Logo.png";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="overlay">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="buttons-container">
          <button
            className="btn-primary"
            onClick={() => navigate("/login")}
          >
            Inicio de Sesion
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate("/registro")}
          >
            Registro
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;