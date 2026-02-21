import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/homescreen";
import LoginScreen from "./screens/Login";
import RegistroScreen from "./screens/registro";
import InicioAdmin from "./screens/Admin/InicioAdmin";
import InicioSpAdmin from "./screens/SuperAdmin/InicioSpAdmin";
import Gestion_Ubicaciones from "./screens/Admin/Gestion_Ubicaciones";
import GestionRutas from "./screens/Admin/GestionRutas"
import GestionEventos from "./screens/Admin/GestionEventos";
import RegistrosAsistencias from "./screens/Admin/RegistrosAsistencias";
import PanelMetricasEventos from "./screens/Admin/PanelMetricasEventos";
import Usuarios from "./screens/SuperAdmin/Usuarios";
import EdificiosRutas from "./screens/SuperAdmin/EdificiosRutas";
import Eventos from "./screens/SuperAdmin/Eventos";
import Logs from "./screens/SuperAdmin/Logs";
import Reportes from "./screens/SuperAdmin/Reportes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registro" element={<RegistroScreen />} />
      <Route path="/admin" element={<InicioAdmin />} />
      <Route path="/admin/ubicaciones" element={<Gestion_Ubicaciones />} />
      <Route path="/admin-sp" element={<InicioSpAdmin />} />
      <Route path="/admin/rutas" element={<GestionRutas />} />
      <Route path="/admin/eventos" element={<GestionEventos />} />
      <Route path="/admin/registros" element={<RegistrosAsistencias />} />
      <Route path="/admin/metricas" element={<PanelMetricasEventos />} />
      <Route path="/admin-sp/usuarios" element={<Usuarios />} />
      <Route path="/admin-sp/edificios-rutas" element={<EdificiosRutas />} />
      <Route path="/admin-sp/eventos" element={<Eventos />} />
      <Route path="/admin-sp/logs" element={<Logs />} />
      <Route path="/admin-sp/reportes" element={<Reportes />} />

    </Routes>
  );
}

export default App;