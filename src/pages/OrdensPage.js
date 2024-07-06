import React, { useState, useEffect } from 'react';

function OrdensPage() {
  const [ordens, setOrdens] = useState([]);
  const [numOrdem, setNumOrdem] = useState('');

  const consultarOrdem = () => {
    let url = 'http://localhost:5000/ordem';
    if (numOrdem !== '' && numOrdem !== '0') {
      url += '/' + numOrdem;
    } else {
      url += '/0';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setOrdens(data.ordens))
      .catch(error => console.error('Erro ao consultar ordens de produção', error));
  };

  const deleteOrdem = () => {
    fetch('http://localhost:5000/ordem/' + numOrdem, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(() => {
        alert('Ordem deletada com sucesso');
        setNumOrdem('');
        consultarOrdem();
      })
      .catch(error => console.error('Erro ao deletar ordem', error));
  };

  useEffect(() => {
    consultarOrdem();
  }, []);

  return (
    <div className="container">
      <h1>Consultar Ordem de Produção</h1>
      <div className="form">
        <label htmlFor="numOrdem">Ordem de produção:</label>
        <input
          type="number"
          id="numOrdem"
          value={numOrdem}
          onChange={(e) => setNumOrdem(e.target.value)}
        />
        <button onClick={consultarOrdem}>Consultar</button>
        <button onClick={deleteOrdem} className="delete-btn">Excluir</button>
      </div>
      <h3>Ordem de produção</h3>
      <hr />
      <table className="table" id="ordensTable">
        <thead>
          <tr>
            <th>N° Ordem</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody id="ordensList">
          {ordens.map((ordem) =>
            ordem.produtos.map((produto, index) => (
              <tr key={index}>
                <td>{ordem.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{ordem.data_criacao}</td>
                <td>
                  <button onClick={() => setNumOrdem(ordem.id)}>Consultar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default OrdensPage;
