import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RutaProtegida from './auth/rutaProtegida.js';
import logo from './logo.png';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeSuper from './pages/HomeSuper';
import CreateSuper from './pages/CreateSuper';
import Welcome from './pages/Welcome';
import MapaCompleto from './pages/MapaCompleto';
import Productos from './pages/Productos';
import ProductoForm from './pages/ProductoForm.js';
import Gondolas from './pages/Gondolas';
import GondolaForm from './pages/GondolaForm';

function App() {
   
  return (
    <div className="App">
      <img className="Logo" src={logo} alt='Market List logo' />
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
              <GondolaForm />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/gondolas/:gondola_id' element={
            <RutaProtegida>
              <GondolaForm />
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
          <Route path='/welcome/:id/:nombre_usuario/producto/form' element={
            <RutaProtegida>
              <ProductoForm />
            </RutaProtegida>
          } />
          <Route path='/welcome/:id/:nombre_usuario/producto/:producto_id' element={
            <RutaProtegida>
              <ProductoForm />
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
