import React, { useState } from "react";
import "../../styles/InicioAdmin.css";
import NavAdmin from "../components/NavAdmin";
import CardUbicacion from "../components/CardUbicacion";

interface Ubicacion {
  titulo: string;
  descripcion: string;
  img: string;
}

const ubicacionesIniciales = [
  {
    titulo: "Entrada",
    descripcion: "Acceso principal al campus",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Entrada.jpg",
  },
  {
    titulo: "Cafetería",
    descripcion: "Zona de alimentos y descanso",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Cafeteria.jpg",
  },
  {
    titulo: "Biblioteca",
    descripcion: "Centro de recursos académicos",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Biblioteca.jpg",
  },
  {
    titulo: "Auditorio",
    descripcion: "Eventos, conferencias y presentaciones",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Auditorio.jpeg",
  },
  {
    titulo: "Enfermería",
    descripcion: "Atención médica para estudiantes",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Enfermeria.jpg",
  },
  {
    titulo: "Edificio K",
    descripcion: "Tecnologías de Automatización",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/k.png",
  },
  {
    titulo: "Edificio J",
    descripcion: "Laboratorios Mecatrónica",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/J.png",
  },
  {
    titulo: "Edificio I",
    descripcion: "Laboratorio Informática",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/I.png",
  },
  {
    titulo: "Servicios Escolares",
    descripcion: "Trámites estudiantiles",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/servicios.jpeg",
  },
  {
    titulo: "Rectoría",
    descripcion: "Oficinas de rectoría",
    img: "https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Rectoria.png",
  },
];

const Gestion_Ubicaciones: React.FC = () => {
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>(ubicacionesIniciales);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<Ubicacion>({
    titulo: "",
    descripcion: "",
    img: "",
  });

  // 🔹 Abrir modal para agregar
  const handleAgregar = () => {
    setFormData({ titulo: "", descripcion: "", img: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  // 🔹 Abrir modal para editar
  const handleEditar = (item: Ubicacion) => {
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  // 🔹 Guardar cambios
  const handleGuardar = () => {
    if (isEditing) {
      setUbicaciones(
        ubicaciones.map((u) =>
          u.titulo === activeCard ? formData : u
        )
      );
    } else {
      setUbicaciones([...ubicaciones, formData]);
    }

    setShowModal(false);
    setActiveCard(null);
  };

  return (
    <div className="admin-container">
      <NavAdmin />

      <div className="main-content">
        <header className="topbar">
          <h1>Gestión de Ubicaciones</h1>

          <button className="btn-agregar" onClick={handleAgregar}>
            + Agregar Ubicación
          </button>
        </header>

        <div className="content-area">
          <div className="cards-grid">
            {ubicaciones.map((item) => (
              <CardUbicacion
                key={item.titulo}
                titulo={item.titulo}
                descripcion={item.descripcion}
                img={item.img}
                active={activeCard === item.titulo}
                onClick={() => {
                  setActiveCard(item.titulo);
                  handleEditar(item);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Editar Ubicación" : "Agregar Ubicación"}</h2>

            <input
              type="text"
              placeholder="Título"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="URL Imagen"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button onClick={handleGuardar} className="btn-guardar">
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn-cancelar"
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

export default Gestion_Ubicaciones;