// src/pages/EditarPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditarPage.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const EditarPage = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/ordem/${id}`)
            .then(response => response.json())
            .then(data => setPedido(data.ordens[0] || {}))
            .catch(error => console.error('Error fetching order:', error));
    }, [id]);

    if (!pedido) {
        return <div>Loading...</div>;
    }

    return (
        <div className="editar-page">
            <h1>Editar pedido</h1>
            <div className="pedido-details">
                <h2>Pedido {pedido.id}</h2>
                {(pedido.produtos || []).map((produto, index) => (
                    <div key={index}>
                        <span>{produto.nome}</span>
                        <span>Qtd {produto.quantidade}</span>
                    </div>
                ))}
            </div>
            <div className="comments-section">
                <h3>Comentários</h3>
                {(pedido.obs || []).map((obs, index) => (
                    <p key={index}>{obs.texto}</p>
                ))}
            </div>
        </div>
    );
};

export default EditarPage;
