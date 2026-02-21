import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Map,
  Calendar,
  Shield,
  BarChart3,
  LogOut,
  Pencil
} from "lucide-react";
import "../../styles/NavSpAdmin.css";
import profile from "../../assets/Perfil.png";

const NavSpAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // 👈 hook de navegación

  return (
    <aside className={`spadmin-sidebar ${collapsed ? "collapsed" : ""}`}>

      <div
        className="spadmin-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </div>

      <div className="spadmin-profile-section">
        <div className="spadmin-profile-wrapper">
          <img src={profile} alt="Perfil" className="spadmin-profile-img" />
          <button className="spadmin-edit-profile-btn">
            <Pencil className="spadmin-edit-icon" />
          </button>
        </div>
      </div>

      <nav className="spadmin-menu">

        {/* 👇 GESTIÓN DE USUARIOS */}
        <button onClick={() => navigate("/admin-sp/usuarios")}>
          <Users size={18} />
          {!collapsed && <span>Gestión de Usuarios</span>}
        </button>

        <button onClick={() => navigate("/admin-sp/edificios-rutas")}>
          <Map size={18} />
          {!collapsed && <span>Gestión de Edificios y Rutas</span>}
        </button>

        <button onClick={() => navigate("/admin-sp/eventos")}>
          <Calendar size={18} />
          {!collapsed && <span>Gestión de Eventos</span>}
        </button>

        <button onClick={() => navigate("/admin-sp/Logs")}>
          <Shield size={18} />
          {!collapsed && <span>Seguridad del Sistema</span>}
        </button>

        <button onClick={() => navigate("/admin-sp/reportes")}>
          <BarChart3 size={18} />
          {!collapsed && <span>Monitoreo y Reportes</span>}
        </button>

      </nav>

      <div className="spadmin-logout">
        <button
          className="spadmin-logout-btn"
          onClick={() => navigate("/login")}
        >
          <LogOut size={16} />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>

    </aside>
  );
};

export default NavSpAdmin;