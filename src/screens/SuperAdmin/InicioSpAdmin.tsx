import React from "react";
import "../../styles/InicioSpAdmin.css";
import NavSpAdmin from "../components/NavSpAdmin";

const InicioSpAdmin: React.FC = () => {
  return (
    <div className="spadmin-container">
      <NavSpAdmin />

      <div className="spadmin-main-content">
        <header className="spadmin-topbar">
          <h1>Bienvenido al panel de Super Administrador</h1>
        </header>

        <div className="spadmin-content-area">
          {/* Aquí va el contenido dinámico */}
        </div>
      </div>
    </div>
  );
};

export default InicioSpAdmin;