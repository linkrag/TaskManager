import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './HomePage.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const HomePage = () => {
  const [pedidos, setOrders] = useState([]);
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

  const renderFooter = (pedidoId) => {
    return (
      <span>
        <Button label="Editar" icon="pi pi-fw pi-pencil" style={{ marginRight: '.25em' }} onClick={() => navigate(`/editar/${pedidoId}`)} />
        <Button label="Excluir" icon="pi pi-times" className="p-button-secondary" />
      </span>
    );
  };

  return (
    <div>
      <div className="banner">
        <h2>Task Manager</h2>
        <p>Criador de tarefas e pedidos para sua empresa</p>
      </div>
      <section className="ordens-page">
        <h2>Últimos pedidos</h2>
        <div className="pedido-cards">
          {pedidos.map((pedido) => (
            <div>
              <Card title={`Pedido ${pedido.id}`} className="ui-card-shadow" footer={renderFooter(pedido.id)}>
                {pedido.produtos.slice(0, 5).map((produto, index) => (
                  <div key={index}>
                    <span>{produto.nome}</span>
                    <span style={{ marginLeft: '30px' }}> Qtd {produto.quantidade}</span>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
