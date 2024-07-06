import React, { useState, useEffect } from 'react';

function ObservacoesPage() {
  const [observacoes, setObservacoes] = useState([]);
  const [numOrdem, setNumOrdem] = useState('');
  const [obs, setObs] = useState('');

  const consultarOrdem = () => {
    let url = 'http://localhost:5000/ordem';
    if (numOrdem !== '' && numOrdem !== '0') {
      url += '/' + numOrdem;
    } else {
      url += '/0';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setObservacoes(data.ordens.flatMap(ordem => ordem.obs)))
      .catch(error => console.error('Erro ao consultar ordens de produção', error));
  };

  const inserirObservacao = () => {
    if (numOrdem === '0' || numOrdem === '') {
      alert('Nenhum número de ordem foi inserido.');
      return;
    }

    if (obs === '' || obs === undefined) {
      alert('Nenhum texto foi inserido.');
      return;
    }

    const data = {
      ordem_id: numOrdem,
      texto: obs
    };

    fetch('http://localhost:5000/obs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => {
        alert('Observação inserida com sucesso');
        setObs('');
        consultarOrdem();
      })
      .catch(error => console.error('Erro ao criar ordem de produção', error));
  };

  const deleteObs = (id) => {
    fetch('http://localhost:5000/obs/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(() => {
        alert('Observação deletada com sucesso');
        consultarOrdem();
      })
      .catch(error => console.error('Erro ao deletar observação', error));
  };

  useEffect(() => {
    consultarOrdem();
  }, []);

  return (
    <div className="container">
      <h1>Consultar Observações</h1>
      <div className="form">
        <label htmlFor="numOrdem">Ordem de produção:</label>
        <input
          type="number"
          id="numOrdem"
          value={numOrdem}
          onChange={(e) => setNumOrdem(e.target.value)}
        />
        <label htmlFor="obs">Observação:</label>
        <textarea
          id="obs"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
        />
        <button onClick={inserirObservacao}>Inserir</button>
      </div>
      <h3>Observações</h3>
      <hr />
      <table className="table" id="obsTable">
        <thead>
          <tr>
            <th>N° Ordem</th>
            <th hidden="true">ID</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody id="obsList">
          {observacoes.map((obs, index) => (
            <tr key={index}>
              <td>{obs.ordem_id}</td>
              <td hidden="true">{obs.id}</td>
              <td>{obs.texto}</td>
              <td>
                <button onClick={() => deleteObs(obs.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default ObservacoesPage;
