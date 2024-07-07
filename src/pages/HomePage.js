import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ordem/0');
        setOrders(response.data.ordens.slice(-6)); // Get the last 6 orders
      } catch (error) {
        console.error('Erro ao buscar ordens', error);
      }
    };

    fetchOrders();
  }, []);

  const handleClick = (id) => {
    navigate(`/editar/${id}`);
  };

  return (
    <div className="homepage">
      <div className="banner">
        <h2>Task Manager</h2>
        <p>Criador de tarefas e pedidos para sua empresa</p>
      </div>
      <section className="orders-section">
        <h2>Últimos pedidos</h2>
        <div className="cards-container">
          {orders.map((order) => (
            <div key={order.id} className="card" onClick={() => handleClick(order.id)}>
              <h3>Pedido {order.id}</h3>
              {order.produtos.map((produto, index) => (
                <p key={index}>
                  {produto.nome} Qtd {produto.quantidade}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
