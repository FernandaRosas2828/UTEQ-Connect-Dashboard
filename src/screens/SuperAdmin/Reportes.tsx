import React from "react";
import "../../styles/Reportes.css";
import NavSpAdmin from "../components/NavSpAdmin";
import {
  Users,
  Map,
  Calendar,
  Shield,
  Activity
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const Reportes: React.FC = () => {

  // 🔹 Datos simulados
  const totalUsuarios = 25;
  const totalEdificios = 8;
  const totalEventos = 12;
  const eventosActivos = 7;
  const eventosInactivos = 5;
  const totalLogs = 34;

  // 📊 Datos gráfica de barras
  const dataGeneral = [
    { name: "Usuarios", total: totalUsuarios },
    { name: "Edificios", total: totalEdificios },
    { name: "Eventos", total: totalEventos },
    { name: "Logs", total: totalLogs }
  ];

  // 🥧 Datos gráfica circular
  const dataEventos = [
    { name: "Activos", value: eventosActivos },
    { name: "Inactivos", value: eventosInactivos }
  ];

  const COLORS = ["#2e7d32", "#b00020"];

  return (
    <div className="reportes-container">
      <NavSpAdmin />

      <div className="reportes-main">
        <header className="reportes-header">
          <h1>Monitoreo y Reportes del Sistema</h1>
        </header>

        <div className="reportes-content">

          {/* TARJETAS */}
          <div className="reportes-cards">

            <div className="reportes-card">
              <Users size={28} />
              <h3>{totalUsuarios}</h3>
              <p>Usuarios Registrados</p>
            </div>

            <div className="reportes-card">
              <Map size={28} />
              <h3>{totalEdificios}</h3>
              <p>Edificios y Rutas</p>
            </div>

            <div className="reportes-card">
              <Calendar size={28} />
              <h3>{totalEventos}</h3>
              <p>Eventos Totales</p>
            </div>

            <div className="reportes-card">
              <Shield size={28} />
              <h3>{totalLogs}</h3>
              <p>Logs del Sistema</p>
            </div>

          </div>

          {/* 📊 GRÁFICAS */}
          <div className="reportes-graficas">

            {/* GRÁFICA DE BARRAS */}
            <div className="grafica-box">
              <h3>Resumen General</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataGeneral}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* GRÁFICA CIRCULAR */}
            <div className="grafica-box">
              <h3>Estado de Eventos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataEventos}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {dataEventos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Reportes;