import React, { useState } from "react";
import "../../styles/RegistrosAsistencias.css";
import NavAdmin from "../components/NavAdmin";
import { X } from "lucide-react";

interface Evento {
  id: number;
  nombre: string;
  lugar: string;
  horario: string;
}

interface Alumno {
  id: number;
  nombre: string;
  asistio: boolean;
}

const RegistrosAsistencias: React.FC = () => {
  const [eventos] = useState<Evento[]>([
    {
      id: 1,
      nombre: "San Valentín UTEQ",
      lugar: "Auditorio UTEQ",
      horario: "9 am - 4 pm",
    },
  ]);

  const [mostrarModalAsistencia, setMostrarModalAsistencia] =
    useState(false);

  const [alumnos, setAlumnos] = useState<Alumno[]>([
    { id: 1, nombre: "María Fernanda", asistio: false },
    { id: 2, nombre: "Carlos López", asistio: false },
    { id: 3, nombre: "Ana Torres", asistio: false },
    { id: 4, nombre: "Luis Ramírez", asistio: false },
  ]);

  const toggleAsistencia = (id: number) => {
    setAlumnos(
      alumnos.map((alumno) =>
        alumno.id === id
          ? { ...alumno, asistio: !alumno.asistio }
          : alumno
      )
    );
  };

  const guardarAsistencias = () => {
    const listaFinal = alumnos.filter((a) => a.asistio);
    console.log("Asistieron:", listaFinal);
    setMostrarModalAsistencia(false);
  };

  return (
    <div className="reg-admin-wrapper">
      <NavAdmin />

      <div className="reg-main-panel">
        <header className="reg-topbar">
          <h1>Gestión de Registros y Asistencias</h1>
        </header>

        <div className="reg-content">
          <div className="reg-tabla">
            <div className="reg-fila reg-encabezado">
              <div>Nombre del evento</div>
              <div>Lugar</div>
              <div>Horario</div>
              <div>Acciones</div>
            </div>

            {eventos.map((evento) => (
              <div className="reg-fila" key={evento.id}>
                <div>{evento.nombre}</div>
                <div>{evento.lugar}</div>
                <div>{evento.horario}</div>

                <div className="reg-acciones">
                  <button
                    className="reg-btn"
                    onClick={() => setMostrarModalAsistencia(true)}
                  >
                    Asistencias
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================
           MODAL PASAR LISTA
      ========================= */}

      {mostrarModalAsistencia && (
        <div className="reg-modal-overlay">
          <div className="reg-modal">
            <div className="reg-modal-header">
              <div>
                <h2>Pasar lista</h2>
                <p>Marca los alumnos que asistieron</p>
              </div>

              <button
                className="reg-close-btn"
                onClick={() => setMostrarModalAsistencia(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="reg-modal-body">
              {alumnos.map((alumno) => (
                <div
                  key={alumno.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <span>{alumno.nombre}</span>

                  <input
                    type="checkbox"
                    checked={alumno.asistio}
                    onChange={() => toggleAsistencia(alumno.id)}
                  />
                </div>
              ))}
            </div>

            <div className="reg-modal-footer">
              <button
                className="reg-btn-cancel"
                onClick={() => setMostrarModalAsistencia(false)}
              >
                Cancelar
              </button>

              <button
                className="reg-btn-save"
                onClick={guardarAsistencias}
              >
                Guardar asistencia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrosAsistencias;