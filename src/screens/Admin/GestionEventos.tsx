import React, { useState } from "react";
import "../../styles/GestionEventos.css";
import NavAdmin from "../components/NavAdmin";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, X, Pencil } from "lucide-react";

interface Evento {
  id: number;
  nombre: string;
  lugar: string;
  fecha: string; // YYYY-MM-DD
  horario: string; // HH:mm
  cupo: number;
  estatus: "Pendiente" | "Aprobada" | "Rechazada"; // Nuevo estatus
}

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const GestionEventos: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      nombre: "San Valentín UTEQ",
      lugar: "Auditorio UTEQ",
      fecha: "2026-02-25",
      horario: "09:00",
      cupo: 150,
      estatus: "Aprobada",
    },
  ]);

  const [solicitudes, setSolicitudes] = useState<Evento[]>([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [solicitudActual, setSolicitudActual] = useState<Evento>({
    id: 0,
    nombre: "",
    lugar: "",
    fecha: "",
    horario: "",
    cupo: 0,
    estatus: "Pendiente",
  });

  /* ================= FUNCIONES ================= */

  const hayConflicto = (fecha: string, horario: string, lugar: string, idExcl?: number) => {
    return eventos.some(
      (ev) =>
        ev.estatus === "Aprobada" &&
        ev.fecha === fecha &&
        ev.horario === horario &&
        ev.lugar.toLowerCase() === lugar.toLowerCase() &&
        ev.id !== idExcl
    );
  };

  const abrirAgregar = () => {
    setModoEdicion(false);
    setSolicitudActual({
      id: Date.now(),
      nombre: "",
      lugar: "",
      fecha: "",
      horario: "",
      cupo: 0,
      estatus: "Pendiente",
    });
    setMostrarModal(true);
  };

  const abrirEditar = (solicitud: Evento) => {
    setModoEdicion(true);
    setSolicitudActual(solicitud);
    setMostrarModal(true);
  };

  const guardarSolicitud = () => {
    if (!solicitudActual.nombre || !solicitudActual.lugar || !solicitudActual.fecha || !solicitudActual.horario) {
      alert("Completa todos los campos.");
      return;
    }

    if (hayConflicto(solicitudActual.fecha, solicitudActual.horario, solicitudActual.lugar, modoEdicion ? solicitudActual.id : undefined)) {
      alert("El lugar ya está ocupado en esa fecha y hora. Elige otro horario o lugar.");
      return;
    }

    if (modoEdicion) {
      setSolicitudes(solicitudes.map(s => s.id === solicitudActual.id ? solicitudActual : s));
    } else {
      setSolicitudes([...solicitudes, solicitudActual]);
    }

    setMostrarModal(false);
    alert("Solicitud guardada correctamente!");
  };

  const eliminarSolicitud = (id: number) => {
    setSolicitudes(solicitudes.filter(s => s.id !== id));
  };

  /* ================= CALENDARIO ================= */

  const eventosCalendario = eventos
    .filter(ev => ev.estatus === "Aprobada")
    .map(ev => {
      const [hora, minuto] = ev.horario.split(":").map(Number);
      const fechaHora = new Date(ev.fecha);
      fechaHora.setHours(hora, minuto);
      return {
        title: `${ev.nombre} - ${ev.lugar}`,
        start: fechaHora,
        end: new Date(fechaHora.getTime() + 60 * 60 * 1000),
        allDay: false,
      };
    });

  /* ================= RENDER ================= */

  return (
    <div className="admin-container">
      <NavAdmin />

      <div className="main-content">
        <header className="topbar">
          <h1>Solicitar un Evento</h1>
        </header>

        <div className="content-area">
          <button className="btn-agregar" onClick={abrirAgregar}>
            <Calendar size={18} /> Nueva Solicitud
          </button>

          <h2>Mis Solicitudes</h2>
          {solicitudes.length === 0 ? (
            <p>No tienes solicitudes pendientes.</p>
          ) : (
            <div className="tabla-eventos">
              <div className="fila encabezado">
                <div>Nombre</div>
                <div>Lugar</div>
                <div>Fecha</div>
                <div>Hora</div>
                <div>Cupo</div>
                <div>Estatus</div>
                <div>Acciones</div>
              </div>
              {solicitudes.map(solicitud => (
                <div className="fila" key={solicitud.id}>
                  <div>{solicitud.nombre}</div>
                  <div>{solicitud.lugar}</div>
                  <div>{solicitud.fecha}</div>
                  <div>{solicitud.horario}</div>
                  <div>{solicitud.cupo}</div>
                  <div className={`estatus-${solicitud.estatus.toLowerCase()}`}>
                    {solicitud.estatus}
                  </div>
                  <div className="acciones">
                    <Pencil size={18} className="icono editar" onClick={() => abrirEditar(solicitud)} />
                    <button className="btn-icon eliminar" onClick={() => eliminarSolicitud(solicitud.id)}>X</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 30 }}>
            <h2>Calendario de Eventos Aprobados</h2>
            <BigCalendar
              localizer={localizer}
              events={eventosCalendario}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month", "week", "day"]}
              style={{ height: 500, marginTop: 20 }}
              messages={{
                next: "Siguiente",
                previous: "Anterior",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                agenda: "Agenda",
              }}
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-pro">
            <div className="modal-header-pro">
              <div>
                <h2>{modoEdicion ? "Editar Solicitud" : "Nueva Solicitud"}</h2>
                <p>Completa la información del evento</p>
              </div>
              <button className="btn-close" onClick={() => setMostrarModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-pro">
              <div className="input-group">
                <label>Nombre del evento</label>
                <input
                  type="text"
                  value={solicitudActual.nombre}
                  onChange={e => setSolicitudActual({ ...solicitudActual, nombre: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>Lugar</label>
                <input
                  type="text"
                  value={solicitudActual.lugar}
                  onChange={e => setSolicitudActual({ ...solicitudActual, lugar: e.target.value })}
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Fecha</label>
                  <input
                    type="date"
                    value={solicitudActual.fecha}
                    onChange={e => setSolicitudActual({ ...solicitudActual, fecha: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Hora</label>
                  <input
                    type="time"
                    value={solicitudActual.horario}
                    onChange={e => setSolicitudActual({ ...solicitudActual, horario: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Cupo</label>
                  <input
                    type="number"
                    value={solicitudActual.cupo}
                    onChange={e => setSolicitudActual({ ...solicitudActual, cupo: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer-pro">
              <button className="btn-cancel" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-save" onClick={guardarSolicitud}>
                {modoEdicion ? "Actualizar Solicitud" : "Guardar Solicitud"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEventos;