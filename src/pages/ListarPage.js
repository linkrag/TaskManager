import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import Card from '../components/Card';
import Button from '../components/CustomButton';
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
    fetchPedidos('http://ordens-app:5003/ordem/0');
  }, []);

  const fetchPedidos = (url) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPedidos(data.ordens || []))
      .catch(error => {
        console.error('Error fetching from server:', error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const endpoint = searchId ? `http://localhost:5003/ordem/${searchId}` : 'http://localhost:5003/ordem/0';
    fetchPedidos(endpoint);
  };

  const handleDelete = (id) => {
    const endpoint = `http://localhost:5003/ordem/${id}`;
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
          label="Visualizar"
          icon="pi pi-pencil"
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
    <div className="ordens-page">
      <h1>Listar pedidos</h1>
      <form style={{ marginRight: '15%', float: 'right' }} onSubmit={handleSearch}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            style={{ borderRadius: '25px' }}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Buscar pedido"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </span>
        <Button type="submit" label="Buscar" />
      </form>

      <div className="pedido-cards">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <Card title={`Pedido ${pedido.id}`} footer={renderFooter(pedido.id)}>
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
