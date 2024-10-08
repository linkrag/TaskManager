import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/CustomButton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './HomePage.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const HomePage = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:5003/ordem/0');
        setPedidos(response.data.ordens.slice(-6));
      } catch (error) {
        console.error('Error fetching orders from server:', error);
      }
    };

    fetchPedidos();
  }, []);

  const handleDelete = (id) => {
    const endpoint = `http://localhost:5003/ordem/${id}`;
    fetch(endpoint, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          alert('Pedido excluído com sucesso');
          setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== id));
        } else {
          console.error('Failed to delete the order');
        }
      })
      .catch(error => console.error('Error deleting the order:', error));
  };

  const renderFooter = (pedidoId) => {
    return (
      <span>
        <Button
          label="Visualizar"
          icon="pi pi-fw pi-pencil"
          style={{ marginRight: '.25em' }}
          onClick={() => navigate(`/view/${pedidoId}`)}
        />
        <Button
          label="Excluir"
          icon="pi pi-times"
          className="p-button-secondary"
          onClick={() => handleDelete(pedidoId)}
        />
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
            <div key={pedido.id}>
              <Card title={`Pedido ${pedido.id}`} className="ui-card-shadow" footer={renderFooter(pedido.id)}>
                <DataTable value={pedido.produtos.slice(0, 5)} scrollable scrollHeight="200px">
                  <Column field="nome" header="Nome do Produto"></Column>
                  <Column field="quantidade" header="Quantidade"></Column>
                </DataTable>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
