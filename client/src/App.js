import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.png';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeSuper from './pages/HomeSuper';
import CreateSuper from './pages/CreateSuper';
import EntradaSalida from './pages/EntradaSalida';
import Welcome from './pages/Welcome';
import MapaCompleto from './pages/MapaCompleto';
import Productos from './pages/Productos';
import CrearProducto from './pages/CrearProducto';
import EditarProducto from './pages/EditarProducto';
import EditarGondola from './pages/EditarGondola';
import UbicProducto from './pages/UbicProducto';
import Gondolas from './pages/Gondolas';
import CrearGondola from './pages/CrearGondola';
import UbicGondola from './pages/UbicGondola';

function App() {
   
  return (
    <div className="App">
      <img className="Logo" src={logo} />
      <Router>
        <Routes>
          <Route path='/login' exact Component={Login}/>
          <Route path='/register' exact Component={Register}/>
          <Route path='/homeSuper/:nombre_usuario' exact Component={HomeSuper}/>
          <Route path='/homeSuper/:nombre_usuario/createSuper' exact Component={CreateSuper}/>
          <Route path='/homeSuper/:nombre_usuario/createSuper/entradasalida/:ancho/:largo' exact Component={EntradaSalida}/>
          <Route path='/welcome/:id/:nombre_usuario' exact Component={Welcome}/>
          <Route path='/welcome/:id/:nombre_usuario/gondolas' exact Component={Gondolas}/>
          <Route path='/welcome/:id/:nombre_usuario/gondolas/crear' exact Component={CrearGondola}/>
          <Route path='/welcome/:id/:nombre_usuario/gondolas/:gondola_id' exact Component={EditarGondola}/>
          <Route path='/welcome/:id/:nombre_usuario/gondolas/crear/ubic' exact Component={UbicGondola}/>
          <Route path='/welcome/:id/:nombre_usuario/mapa' exact Component={MapaCompleto}/>
          <Route path='/welcome/:id/:nombre_usuario/producto' exact Component={Productos}/>
          <Route path='/welcome/:id/:nombre_usuario/producto/crear' exact Component={CrearProducto}/>
          <Route path='/welcome/:id/:nombre_usuario/producto/:producto_id' exact Component={EditarProducto}/>
          <Route path='/welcome/:id/:nombre_usuario/producto/crear/ubic' exact Component={UbicProducto}/>
          {/* Ruta por defecto */}
          <Route path='/*' element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
