import React from "react";
import "../../styles/InicioAdmin.css";
import NavAdmin from "../components/NavAdmin";

const InicioAdmin: React.FC = () => {
  return (
    <div className="admin-container">
      
      <NavAdmin />

      <div className="main-content">
        <header className="topbar">
          <h1>Bienvenido al panel de administrador</h1>
        </header>

        <div className="content-area"></div>
      </div>
    </div>
  );
};

export default InicioAdmin;