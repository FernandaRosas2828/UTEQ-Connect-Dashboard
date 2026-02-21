import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/NavAdmin.css";
import profile from "../../assets/Perfil.png";
import {
  MapPin,
  Route,
  Calendar,
  ClipboardList,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";

const NavAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Botón colapsar */}
      <div
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </div>

      {/* Perfil */}
      <div className="profile-section">
        <div className="profile-wrapper">
          <img src={profile} alt="Perfil" className="profile-img" />
          <button className="edit-profile-btn">
            <Pencil className="edit-icon" />
          </button>
        </div>
      </div>

      {/* Menú */}
      <nav className="menu">

        <button
          className={location.pathname === "/admin/ubicaciones" ? "active" : ""}
          onClick={() => navigate("/admin/ubicaciones")}
        >
          <MapPin size={18} />
          {!collapsed && <span>Gestión de Ubicaciones</span>}
        </button>

        <button
          onClick={() => navigate("/admin/rutas")}
        >
          <Route size={18} />
          {!collapsed && <span>Gestión de Rutas</span>}
        </button>

        <button
          onClick={() => navigate("/admin/eventos")}
        >
          <Calendar size={18} />
          {!collapsed && <span>Gestión de eventos</span>}
        </button>

        <button
          onClick={() => navigate("/admin/registros")}
        >
          <ClipboardList size={18} />
          {!collapsed && <span>Registros y Asistencias</span>}
        </button>

        <button
          onClick={() => navigate("/admin/metricas")}
        >
          <BarChart3 size={18} />
          {!collapsed && <span>Supervisión y Métricas</span>}
        </button>
      </nav>

      {/* Logout */}
      <div className="logout">
        <button
          className="logout-btn"
          onClick={() => navigate("/login")}
        >
          <LogOut size={16} />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default NavAdmin;