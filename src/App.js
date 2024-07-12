import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CriarPage from './pages/CriarPage';
import ListarPage from './pages/ListarPage';
import ViewPage from './pages/ViewPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listar" element={<ListarPage />} />
        <Route path="/criar" element={<CriarPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
