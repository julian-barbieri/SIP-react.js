import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RutaProtegida from './auth/rutaProtegida.js';
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
          
          {/* Rutas protegidas */}
          <Route path='/app/:nombre_usuario/*' element={
            <RutaProtegida>
              <HomeSuper />
            </RutaProtegida>
          } />
          <Route path='/app/:nombre_usuario/createSuper' element={
            <RutaProtegida>
              <CreateSuper />
            </RutaProtegida>
          } />
          <Route path='/homeSuper/:nombre_usuario/createSuper/entradasalida/:ancho/:largo' element={
            <RutaProtegida>
              <EntradaSalida />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario' element={
            <RutaProtegida>
              <Welcome />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/gondolas' element={
            <RutaProtegida>
              <Gondolas />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/gondolas/crear' element={
            <RutaProtegida>
              <CrearGondola />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/gondolas/:gondola_id' element={
            <RutaProtegida>
              <EditarGondola />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/gondolas/crear/ubic' element={
            <RutaProtegida>
              <UbicGondola />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/mapa' element={
            <RutaProtegida>
              <MapaCompleto />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/producto' element={
            <RutaProtegida>
              <Productos />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/producto/crear' element={
            <RutaProtegida>
              <CrearProducto />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/producto/:producto_id' element={
            <RutaProtegida>
              <EditarProducto />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/producto/crear/ubic' element={
            <RutaProtegida>
              <UbicProducto />
            </RutaProtegida>
          } />
          {/* Ruta por defecto */}
          <Route exact path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
