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

  const handleDelete = (id) => {
    const endpoint = `http://localhost:5000/ordem/${id}`;
    fetch(endpoint, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          alert('Pedido excluído com sucesso');
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
            <div>
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
