import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditarPage.css';

const EditarPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/ordem/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Erro ao buscar ordem', error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="editar-container">
            <h1>Detalhes do Pedido</h1>
            <h2>Pedido {order.id}</h2>
            <div>
                <h3>Produtos</h3>
                {order.produtos.map((produto, index) => (
                    <p key={index}>
                        {produto.nome} - Qtd {produto.quantidade}
                    </p>
                ))}
            </div>
            <div>
                <h3>Observações</h3>
                {order.obs.map((observacao, index) => (
                    <p key={index}>{observacao.texto}</p>
                ))}
            </div>
            <p>Data de criação: {order.data_criacao}</p>
        </div>
    );
};

export default EditarPage;