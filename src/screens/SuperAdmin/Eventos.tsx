import React, { useState } from "react";
import "../../styles/Eventos.css";
import NavSpAdmin from "../components/NavSpAdmin";
import {
  Plus,
  Pencil,
  Trash2,
  Power,
  PowerOff,
  X
} from "lucide-react";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

/* ================= LOCALIZADOR ================= */

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

/* ================= INTERFACES ================= */

interface Evento {
  id: number;
  nombre: string;
  lugar: string;
  fecha: string;
  horario: string;
  cupo: number;
  activo: boolean;
}

interface SolicitudEvento {
  id: number;
  nombre: string;
  lugar: string;
  fecha: string;
  horario: string;
  cupo: number;
  usuario: string;
}

/* ================= COMPONENTE ================= */

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      nombre: "Conferencia de Tecnología",
      lugar: "Auditorio Principal",
      fecha: "2026-02-25",
      horario: "10:00",
      cupo: 100,
      activo: true,
    },
  ]);

  const [solicitudes, setSolicitudes] = useState<SolicitudEvento[]>([
    {
      id: 101,
      nombre: "Feria de Innovación",
      lugar: "Sala 2",
      fecha: "2026-02-28",
      horario: "14:00",
      cupo: 50,
      usuario: "Carlos Pérez",
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [eventoActual, setEventoActual] = useState<Evento | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    lugar: "",
    fecha: "",
    horario: "",
    cupo: 0,
  });

  /* ================= FUNCIONES ================= */

  // Verifica si hay conflicto de hora
  const hayConflicto = (fecha: string, horario: string, idExcluir?: number) => {
    return eventos.some(
      (ev) =>
        ev.activo &&
        ev.fecha === fecha &&
        ev.horario === horario &&
        ev.id !== idExcluir
    );
  };

  // Abrir modal agregar
  const abrirModalAgregar = () => {
    setModoEdicion(false);
    setEventoActual(null);
    setFormData({ nombre: "", lugar: "", fecha: "", horario: "", cupo: 0 });
    setMostrarModal(true);
  };

  // Abrir modal editar
  const abrirModalEditar = (evento: Evento) => {
    setModoEdicion(true);
    setEventoActual(evento);
    setFormData({
      nombre: evento.nombre,
      lugar: evento.lugar,
      fecha: evento.fecha,
      horario: evento.horario,
      cupo: evento.cupo,
    });
    setMostrarModal(true);
  };

  // Cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "cupo" ? Number(e.target.value) : e.target.value,
    });
  };

  // Guardar evento
  const guardarEvento = () => {
    if (hayConflicto(formData.fecha, formData.horario, eventoActual?.id)) {
      alert("Ya existe un evento en esa fecha y horario.");
      return;
    }

    if (modoEdicion && eventoActual) {
      setEventos(
        eventos.map((ev) =>
          ev.id === eventoActual.id ? { ...ev, ...formData } : ev
        )
      );
    } else {
      const nuevoEvento: Evento = {
        id: Date.now(),
        ...formData,
        activo: true,
      };
      setEventos([...eventos, nuevoEvento]);
    }

    setMostrarModal(false);
  };

  // Eliminar evento
  const eliminarEvento = (id: number) => {
    setEventos(eventos.filter((ev) => ev.id !== id));
  };

  // Activar / desactivar
  const toggleEstado = (id: number) => {
    setEventos(
      eventos.map((ev) =>
        ev.id === id ? { ...ev, activo: !ev.activo } : ev
      )
    );
  };

  // Aceptar solicitud
  const aceptarSolicitud = (solicitud: SolicitudEvento) => {
    if (hayConflicto(solicitud.fecha, solicitud.horario)) {
      alert("Conflicto de horario. No se puede aprobar.");
      return;
    }

    const nuevoEvento: Evento = {
      id: Date.now(),
      nombre: solicitud.nombre,
      lugar: solicitud.lugar,
      fecha: solicitud.fecha,
      horario: solicitud.horario,
      cupo: solicitud.cupo,
      activo: true,
    };

    setEventos([...eventos, nuevoEvento]);
    setSolicitudes(solicitudes.filter((s) => s.id !== solicitud.id));
  };

  const rechazarSolicitud = (id: number) => {
    setSolicitudes(solicitudes.filter((s) => s.id !== id));
  };

  /* ================= CALENDARIO ================= */

  const eventosCalendario = eventos
    .filter((ev) => ev.activo)
    .map((ev) => {
      const fechaHora = new Date(`${ev.fecha}T${ev.horario}:00`);
      return {
        title: `${ev.nombre} - ${ev.lugar}`,
        start: fechaHora,
        end: new Date(fechaHora.getTime() + 60 * 60 * 1000),
        allDay: false,
      };
    });

  /* ================= RENDER ================= */

  return (
    <div className="eventos-container">
      <NavSpAdmin />

      <div className="eventos-main">
        <header className="eventos-header">
          <h1>Gestión de Eventos</h1>
        </header>

        <div className="eventos-content">

          {/* SOLICITUDES */}
          <div className="eventos-solicitudes">
            <h2>Solicitudes Pendientes ({solicitudes.length})</h2>

            {solicitudes.length === 0 ? (
              <p>No hay solicitudes pendientes</p>
            ) : (
              <table className="eventos-table">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Lugar</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Solicitado por</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <td>{solicitud.nombre}</td>
                      <td>{solicitud.lugar}</td>
                      <td>{solicitud.fecha}</td>
                      <td>{solicitud.horario}</td>
                      <td>{solicitud.usuario}</td>
                      <td>
                        <button
                          className="eventos-btn-aprobar"
                          onClick={() => aceptarSolicitud(solicitud)}
                        >
                          Aprobar
                        </button>
                        <button
                          className="eventos-btn-rechazar"
                          onClick={() => rechazarSolicitud(solicitud.id)}
                        >
                          Rechazar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* BOTÓN AGREGAR */}
          <div className="eventos-actions-top">
            <button className="eventos-btn-agregar" onClick={abrirModalAgregar}>
              <Plus size={18} /> Agregar evento
            </button>
          </div>

          {/* TABLA EVENTOS */}
          <table className="eventos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Lugar</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cupo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.nombre}</td>
                  <td>{evento.lugar}</td>
                  <td>{evento.fecha}</td>
                  <td>{evento.horario}</td>
                  <td>{evento.cupo}</td>
                  <td>{evento.activo ? "Activo" : "Inactivo"}</td>
                  <td>
                    <button onClick={() => abrirModalEditar(evento)}>
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => toggleEstado(evento.id)}>
                      {evento.activo ? <PowerOff size={18} /> : <Power size={18} />}
                    </button>
                    <button onClick={() => eliminarEvento(evento.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CALENDARIO */}
          <div style={{ marginTop: "50px" }}>
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

          {/* MODAL */}
          {mostrarModal && (
            <div className="eventos-modal-overlay">
              <div className="eventos-modal-container">
                <div className="eventos-modal-header">
                  <h2>{modoEdicion ? "Editar evento" : "Agregar evento"}</h2>
                  <X onClick={() => setMostrarModal(false)} />
                </div>

                <div className="eventos-modal-body">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del evento"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lugar"
                    placeholder="Lugar"
                    value={formData.lugar}
                    onChange={handleChange}
                  />
                  <input
                    type="date"
                    name="fecha"
                    placeholder="Fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                  <input
                    type="time"
                    name="horario"
                    placeholder="Horario"
                    value={formData.horario}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="cupo"
                    placeholder="Cupo"
                    value={formData.cupo}
                    onChange={handleChange}
                  />

                  <div className="eventos-modal-footer">
                    <button
                      className="eventos-btn-cancelar"
                      onClick={() => setMostrarModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="eventos-btn-guardar"
                      onClick={guardarEvento}
                    >
                      {modoEdicion ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Eventos;