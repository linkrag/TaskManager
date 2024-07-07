import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdensPage.css';
import axios from 'axios';

const OrdensPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ordem/0');
        setOrders(response.data.ordens);
      } catch (error) {
        console.error('Erro ao buscar ordens', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:5000/ordem/${search}`);
        setOrders([response.data]);
        setCurrentPage(1);
      } catch (error) {
        console.error('Erro ao buscar ordem', error);
        setOrders([]);
      }
    } else {
      // Reset to all orders if search is cleared
      const response = await axios.get('http://localhost:5000/ordem');
      setOrders(response.data.ordens);
    }
  };

  const handleClick = (id) => {
    navigate(`/editar/${id}`);
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button onClick={() => setCurrentPage(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="ordens-container">
      <h1>Listar pedidos</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar pedido"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <h2>Últimos pedidos</h2>
      <div className="ordens-container">
        {currentOrders.map((order) => (
          <div key={order.id} className="ordem" onClick={() => handleClick(order.id)}>
            <h3>Pedido {order.id}</h3>
            {order.produtos.map((produto, index) => (
              <p key={index}>
                {produto.nome} Qtd {produto.quantidade}
              </p>
            ))}
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination">{renderPagination()}</ul>
      </nav>
    </div>
  );
};

export default OrdensPage;