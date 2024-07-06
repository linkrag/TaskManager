import React, { useState } from 'react';

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const adicionarProduto = () => {
    if (nomeProduto.trim() === '' || quantidade.trim() === '') {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const produto = {
      nome: nomeProduto,
      quantidade: parseInt(quantidade)
    };

    setProdutos([...produtos, produto]);
    setNomeProduto('');
    setQuantidade('');
  };

  const removerProduto = (produto) => {
    setProdutos(produtos.filter(p => p !== produto));
  };

  return (
    <div className="container">
      <h1>Criar Ordem de Produção</h1>
      <div className="form">
        <label htmlFor="nome_produto">Nome do Produto:</label>
        <input
          type="text"
          id="nome_produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
        />
        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button onClick={adicionarProduto}>Adicionar</button>
      </div>
      <h3>Produtos Inseridos</h3>
      <hr />
      <table className="table" id="produtoTable">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody id="produtoList">
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
              <td>
                <button onClick={() => removerProduto(produto)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <button onClick={() => alert('Função de criar ordem ainda não implementada.')}>Criar</button>
    </div>
  );
}

export default ProdutosPage;
