import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <header className="header">
        <img src="src\images\index-image.jpg" alt="Header" className="header-image" />
        <div className="header-text">
          <h1>Task Manager</h1>
          <p>Criador de tarefas e pedidos para sua empresa</p>
        </div>
      </header>
      <section className="latest-orders">
        <h2>Últimos pedidos</h2>
        <div className="orders-grid">
          {Array(6).fill().map((_, index) => (
            <div className="order-card" key={index}>
              <h3>Pedido 0{index + 1}</h3>
              <ul>
                {Array(5).fill().map((_, idx) => (
                  <li key={idx}>Item 0{idx + 1} - Qtd 0{idx + 1}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <p>Task Manager</p>
        <nav className="footer-nav">
          <ul>
            <li>Início</li>
            <li>Criação</li>
            <li>Listar/Editar</li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default HomePage;
