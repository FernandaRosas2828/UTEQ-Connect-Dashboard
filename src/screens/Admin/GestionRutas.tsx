import React, { useState } from "react";
import "../../styles/GestionRutas.css";
import NavAdmin from "../components/NavAdmin";
import { Pencil, Ban, CheckCircle, Plus } from "lucide-react";

interface Ruta {
  id: number;
  nombre: string;
  latitud: string;
  longitud: string;
  estatus: boolean;
}

const GestionRutas: React.FC = () => {
  const [rutas, setRutas] = useState<Ruta[]>([
    {
      id: 1,
      nombre: "Ruta Principal",
      latitud: "20.63865",
      longitud: "-100.43341",
      estatus: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rutaActual, setRutaActual] = useState<Ruta | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    latitud: "",
    longitud: "",
  });

  const handleAgregar = () => {
    setFormData({ nombre: "", latitud: "", longitud: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditar = (ruta: Ruta) => {
    setRutaActual(ruta);
    setFormData({
      nombre: ruta.nombre,
      latitud: ruta.latitud,
      longitud: ruta.longitud,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleGuardar = () => {
    if (!formData.nombre || !formData.latitud || !formData.longitud) return;

    if (isEditing && rutaActual) {
      setRutas(
        rutas.map((r) =>
          r.id === rutaActual.id ? { ...r, ...formData } : r
        )
      );
    } else {
      const nuevaRuta: Ruta = {
        id: Date.now(),
        ...formData,
        estatus: true,
      };
      setRutas([...rutas, nuevaRuta]);
    }

    setShowModal(false);
  };

  const toggleEstatus = (id: number) => {
    setRutas(
      rutas.map((r) =>
        r.id === id ? { ...r, estatus: !r.estatus } : r
      )
    );
  };

  return (
    <div className="admin-container">
      <NavAdmin />

      <div className="main-content">
        <header className="topbar rutas-topbar">
          <h1>Gestión de Rutas</h1>
        </header>

        <div className="content-area rutas-content">

          {/* MAPA */}
          <div className="map-container">
            <iframe
              title="Mapa UTEQ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29870.07649894674!2d-100.43341862501377!3d20.63865497852324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35a486363880d%3A0xd927286fe3c75218!2sUTEQ!5e0!3m2!1ses!2smx!4v1771609657641!5m2!1ses!2smx"
              className="map-frame"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* BOTÓN AGREGAR */}
          <div className="agregar-container">
            <button className="btn-agregar 1875rem" onClick={handleAgregar}>
              <Plus size={18} />
              Agregar Ruta
            </button>
          </div>

          {/* TABLA */}
          <div className="tabla-container">
            <div className="tabla-header">
              <div>Nombre</div>
              <div>Latitud</div>
              <div>Longitud</div>
              <div>Estatus</div>
              <div>Acciones</div>
            </div>

            {rutas.map((ruta) => (
              <div className="tabla-row-datos" key={ruta.id}>
                <div>{ruta.nombre}</div>
                <div>{ruta.latitud}</div>
                <div>{ruta.longitud}</div>
                <div>
                  <span className={ruta.estatus ? "activo" : "inactivo"}>
                    {ruta.estatus ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <div className="acciones">
                  <button
                    className="btn-icon editar"
                    onClick={() => handleEditar(ruta)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className={`btn-icon ${
                      ruta.estatus ? "desactivar" : "activar"
                    }`}
                    onClick={() => toggleEstatus(ruta.id)}
                  >
                    {ruta.estatus ? (
                      <Ban size={16} />
                    ) : (
                      <CheckCircle size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Editar Ruta" : "Agregar Ruta"}</h2>

            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Latitud"
              value={formData.latitud}
              onChange={(e) =>
                setFormData({ ...formData, latitud: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Longitud"
              value={formData.longitud}
              onChange={(e) =>
                setFormData({ ...formData, longitud: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button className="btn-guardar" onClick={handleGuardar}>
                Guardar
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionRutas;