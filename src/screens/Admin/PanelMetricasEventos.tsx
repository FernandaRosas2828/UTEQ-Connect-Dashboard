import React, { useState } from "react";
import "../../styles/PanelMetricasEventos.css";
import NavAdmin from "../components/NavAdmin";
import { BarChart3, Users, CalendarCheck } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface EventoMetricas {
  id: number;
  nombre: string;
  registrados: number;
  asistieron: number;
}

const PanelMetricasEventos: React.FC = () => {
  const [eventos] = useState<EventoMetricas[]>([
    {
      id: 1,
      nombre: "San Valentín UTEQ",
      registrados: 150,
      asistieron: 120,
    },
    {
      id: 2,
      nombre: "Feria Tecnológica",
      registrados: 200,
      asistieron: 165,
    },
  ]);

  const totalEventos = eventos.length;
  const totalRegistrados = eventos.reduce((acc, e) => acc + e.registrados, 0);
  const totalAsistencias = eventos.reduce((acc, e) => acc + e.asistieron, 0);

  return (
    <div className="met-admin-wrapper">
      <NavAdmin />

      <div className="met-main-panel">
        <header className="met-topbar">
          <h1>Panel de Métricas y Supervisión</h1>
        </header>

        <div className="met-content">

          {/* ===== TARJETAS KPI ===== */}

          <div className="met-kpi-grid">
            <div className="met-card">
              <BarChart3 size={28} />
              <h3>{totalEventos}</h3>
              <p>Eventos Totales</p>
            </div>

            <div className="met-card">
              <Users size={28} />
              <h3>{totalRegistrados}</h3>
              <p>Total Registrados</p>
            </div>

            <div className="met-card">
              <CalendarCheck size={28} />
              <h3>{totalAsistencias}</h3>
              <p>Total Asistencias</p>
            </div>
          </div>

          {/* ===== GRÁFICA REAL ===== */}

          <div className="met-chart-container">
            <h2>Comparación por Evento</h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={eventos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrados" fill="#3b82f6" name="Registrados" />
                <Bar dataKey="asistieron" fill="#10b981" name="Asistieron" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ===== TABLA CON PROGRESO ===== */}

          <div className="met-table">
            <div className="met-row met-header">
              <div>Evento</div>
              <div>Registrados</div>
              <div>Asistieron</div>
              <div>% Asistencia</div>
            </div>

            {eventos.map((evento) => {
              const porcentaje =
                (evento.asistieron / evento.registrados) * 100;

              return (
                <div className="met-row" key={evento.id}>
                  <div>{evento.nombre}</div>
                  <div>{evento.registrados}</div>
                  <div>{evento.asistieron}</div>
                  <div>
                    <span className="met-percent">
                      {porcentaje.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PanelMetricasEventos;