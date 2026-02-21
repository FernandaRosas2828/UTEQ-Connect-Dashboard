import React, { useState } from "react";
import "../../styles/Usuarios.css";
import NavSpAdmin from "../components/NavSpAdmin";
import { Pencil, Ban, Trash2, Plus, X } from "lucide-react";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipo: string;
  estatus: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nombre: "Maria Fernanda Rosas Briones",
      correo: "fernandarosas@gmail.com",
      tipo: "Administrador",
      estatus: "Activo"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    tipo: "Administrador",
    estatus: "Activo"
  });

  const abrirAgregar = () => {
    setModoEdicion(false);
    setFormData({
      nombre: "",
      correo: "",
      tipo: "Administrador",
      estatus: "Activo"
    });
    setShowModal(true);
  };

  const abrirEditar = (usuario: Usuario) => {
    setModoEdicion(true);
    setUsuarioActual(usuario);
    setFormData(usuario);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const guardarUsuario = () => {
    if (modoEdicion && usuarioActual) {
      setUsuarios(usuarios.map(u =>
        u.id === usuarioActual.id ? { ...usuarioActual, ...formData } : u
      ));
    } else {
      const nuevoUsuario: Usuario = {
        id: Date.now(),
        ...formData
      };
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    cerrarModal();
  };

  const eliminarUsuario = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div className="usuarios-container">
      <NavSpAdmin />

      <div className="usuarios-main">
        <header className="usuarios-header">
          <h1>Gestión de usuarios</h1>
        </header>

        <div className="usuarios-content">

          {/* 🔥 BOTÓN AGREGAR */}
          <div className="usuarios-actions-top">
            <button className="btn-agregarS" onClick={abrirAgregar}>
              <Plus size={18} /> Agregar Usuario
            </button>
          </div>

          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Correo Electrónico</th>
                <th>Tipo de usuario</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.tipo}</td>
                  <td className="estatus-activo">{usuario.estatus}</td>
                  <td className="acciones">
                    <button
                      className="btn-icon"
                      onClick={() => abrirEditar(usuario)}
                    >
                      <Pencil size={18} />
                    </button>

                    <button className="btn-icon">
                      <Ban size={18} />
                    </button>

                    <button
                      className="btn-icon delete"
                      onClick={() => eliminarUsuario(usuario.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">

            <div className="modal-header">
              <h2>{modoEdicion ? "Editar Usuario" : "Agregar Usuario"}</h2>
              <button onClick={cerrarModal}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />

              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleChange}
              />

              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option>Administrador</option>
                <option>Usuario</option>
              </select>

              <select name="estatus" value={formData.estatus} onChange={handleChange}>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>

              <button className="btn-guardar" onClick={guardarUsuario}>
                {modoEdicion ? "Actualizar" : "Guardar"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;