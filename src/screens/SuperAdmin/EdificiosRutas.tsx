import React, { useState } from "react";
import "../../styles/EdificiosRutas.css";
import NavSpAdmin from "../components/NavSpAdmin";
import { Pencil, Trash2, Plus, Lock, Unlock } from "lucide-react";

interface Ruta {
  id: number;
  nombre: string;
  latitud: string;
  longitud: string;
  estatus: "Activo" | "Inactivo";
}

interface Edificio {
  id: number;
  nombre: string;
  latitud: string;
  longitud: string;
  estatus: "Activo" | "Inactivo";
}

const EdificiosRutas: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipo, setTipo] = useState<"ruta" | "edificio">("ruta");
  const [editando, setEditando] = useState<any>(null);

  const [rutas, setRutas] = useState<Ruta[]>([
    {
      id: 1,
      nombre: "Ruta Norte",
      latitud: "20.5888",
      longitud: "-100.3899",
      estatus: "Activo",
    },
  ]);

  const [edificios, setEdificios] = useState<Edificio[]>([
    {
      id: 1,
      nombre: "Edificio A",
      latitud: "20.5891",
      longitud: "-100.3902",
      estatus: "Activo",
    },
  ]);

  const abrirModal = (tipoModal: "ruta" | "edificio", item?: any) => {
    setTipo(tipoModal);
    setEditando(item || null);
    setModalOpen(true);
  };

  const toggleEstatusRuta = (id: number) => {
    setRutas((prev) =>
      prev.map((ruta) =>
        ruta.id === id
          ? {
              ...ruta,
              estatus: ruta.estatus === "Activo" ? "Inactivo" : "Activo",
            }
          : ruta
      )
    );
  };

  const toggleEstatusEdificio = (id: number) => {
    setEdificios((prev) =>
      prev.map((edificio) =>
        edificio.id === id
          ? {
              ...edificio,
              estatus:
                edificio.estatus === "Activo" ? "Inactivo" : "Activo",
            }
          : edificio
      )
    );
  };

  return (
    <div className="spadmin-container">
      <NavSpAdmin />

      <div className="edr-main">
        <div className="edr-header">
          <h1>Gestión de Edificio y Rutas</h1>
        </div>

        <div className="edr-content">

          {/* ================= RUTAS ================= */}
          <div className="edr-section">
            <div className="edr-actions-top">
              <button
                className="edr-btn-agregar"
                onClick={() => abrirModal("ruta")}
              >
                <Plus size={18} /> Agregar Ruta
              </button>
            </div>

            <table className="edr-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rutas.map((ruta) => (
                  <tr key={ruta.id}>
                    <td>{ruta.nombre}</td>
                    <td>{ruta.latitud}</td>
                    <td>{ruta.longitud}</td>
                    <td
                      className={
                        ruta.estatus === "Activo"
                          ? "estatus-activo"
                          : "estatus-inactivo"
                      }
                    >
                      {ruta.estatus}
                    </td>
                    <td>
                      <div className="acciones">

                        {/* 🔒 Toggle */}
                        <button
                          className="btn-icon toggle"
                          onClick={() => toggleEstatusRuta(ruta.id)}
                          title={
                            ruta.estatus === "Activo"
                              ? "Desactivar"
                              : "Activar"
                          }
                        >
                          {ruta.estatus === "Activo" ? (
                            <Lock size={16} />
                          ) : (
                            <Unlock size={16} />
                          )}
                        </button>

                        {/* Editar */}
                        <button
                          className="btn-icon"
                          onClick={() => abrirModal("ruta", ruta)}
                        >
                          <Pencil size={16} />
                        </button>

                        {/* Eliminar */}
                        <button className="btn-icon delete">
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= EDIFICIOS ================= */}
          <div className="edr-section">
            <div className="edr-actions-top">
              <button
                className="edr-btn-agregar"
                onClick={() => abrirModal("edificio")}
              >
                <Plus size={18} /> Agregar Edificio
              </button>
            </div>

            <table className="edr-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {edificios.map((edificio) => (
                  <tr key={edificio.id}>
                    <td>{edificio.nombre}</td>
                    <td>{edificio.latitud}</td>
                    <td>{edificio.longitud}</td>
                    <td
                      className={
                        edificio.estatus === "Activo"
                          ? "estatus-activo"
                          : "estatus-inactivo"
                      }
                    >
                      {edificio.estatus}
                    </td>
                    <td>
                      <div className="acciones">

                        <button
                          className="btn-icon toggle"
                          onClick={() =>
                            toggleEstatusEdificio(edificio.id)
                          }
                          title={
                            edificio.estatus === "Activo"
                              ? "Desactivar"
                              : "Activar"
                          }
                        >
                          {edificio.estatus === "Activo" ? (
                            <Lock size={16} />
                          ) : (
                            <Unlock size={16} />
                          )}
                        </button>

                        <button
                          className="btn-icon"
                          onClick={() =>
                            abrirModal("edificio", edificio)
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button className="btn-icon delete">
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>
                {editando ? "Editar" : "Agregar"} {tipo}
              </h3>
              <button onClick={() => setModalOpen(false)}>✖</button>
            </div>

            <div className="modal-body">
              <input
                placeholder="Nombre"
                defaultValue={editando?.nombre}
              />
              <input
                placeholder="Latitud"
                defaultValue={editando?.latitud}
              />
              <input
                placeholder="Longitud"
                defaultValue={editando?.longitud}
              />
              <select
                defaultValue={editando?.estatus || "Activo"}
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancelar"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button className="btn-guardar">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EdificiosRutas;