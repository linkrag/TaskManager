import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CriarPage from './pages/CriarPage';
import ListarPage from './pages/ListarPage';
import ViewPage from './pages/ViewPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import CadastroPage from './pages/CadastroPage';
import PerfilPage from './pages/PerfilPage';

function Layout({ children }) {
  const location = useLocation();
  
  const hideLayout = location.pathname === '/login' || location.pathname === '/cadastro';
  
  return (
    <>
      {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/listar" element={<PrivateRoute element={<ListarPage />} />} />
          <Route path="/criar" element={<PrivateRoute element={<CriarPage />} />} />
          <Route path="/view/:id" element={<PrivateRoute element={<ViewPage />} />} />
          <Route path="/perfil" element={<PrivateRoute element={<PerfilPage />} />} />
          <Route path="/cadastro" element={<CadastroPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
