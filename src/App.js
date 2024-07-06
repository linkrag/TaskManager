import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import OrdensPage from './pages/OrdensPage';
import ObservacoesPage from './pages/ObservacoesPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listar" element={<OrdensPage />} />
        <Route path="/criar" element={<ProdutosPage />} />
        <Route path="/observacoes" element={<ObservacoesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
