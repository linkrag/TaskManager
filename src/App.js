import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CriarPage from './pages/CriarPage';
import ListarPage from './pages/ListarPage';
import EditarPage from './pages/EditarPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listar" element={<ListarPage />} />
        <Route path="/criar" element={<CriarPage />} />
        <Route path="/editar/:id" element={<EditarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
