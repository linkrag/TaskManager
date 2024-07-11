// src/pages/OrdensPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './ListarPage.css';

const OrdensPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/ordem/0') // assuming /ordem/0 fetches all orders
      .then(response => response.json())
      .then(data => setPedidos(data.ordens || []))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const endpoint = searchId ? `http://localhost:5000/ordem/${searchId}` : 'http://localhost:5000/ordem/0';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setPedidos(data.ordens || []))
      .catch(error => console.error('Error fetching the order:', error));
  };

  const handleDelete = (id) => {
    const endpoint = `http://localhost:5000/ordem/${id}`;
    fetch(endpoint, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== id));
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
          label="Editar"
          icon="pi pi-fw pi-pencil"
          style={{ marginRight: '.25em' }}
          onClick={() => navigate(`/editar/${pedidoId}`)}
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
    <div className="ordens-page">
      <h1>Listar pedidos</h1>
      <form style={{ marginRight: '15%', float: 'right' }} onSubmit={handleSearch}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Buscar pedido" />
        </span>
        <button type="submit">Buscar</button>
      </form>

      <div className="pedido-cards">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <Card title={`Pedido ${pedido.id}`} className="ui-card-shadow" footer={renderFooter(pedido.id)}>
              <DataTable value={pedido.produtos} scrollable scrollHeight="200px">
                <Column field="nome" header="Nome do Produto"></Column>
                <Column field="quantidade" header="Quantidade"></Column>
              </DataTable>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdensPage;
