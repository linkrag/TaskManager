import React, { useState } from 'react';
import axios from 'axios';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import './CriarPage.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const CriarPage = () => {
  const [produtoNome, setProdutoNome] = useState('');
  const [produtoQuantidade, setProdutoQuantidade] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const handleAddProduto = () => {
    if (produtoNome && produtoQuantidade) {
      setProdutos([...produtos, { nome: produtoNome, quantidade: produtoQuantidade }]);
      setProdutoNome('');
      setProdutoQuantidade('');
    }
  };

  const handleAddComentario = () => {
    if (comentario) {
      setComentarios([...comentarios, comentario]);
      setComentario('');
    }
  };

  const handleFinalizar = async () => {
    try {
      const ordemResponse = await axios.post('http://localhost:5000/ordem', { produtos });
      const ordemId = ordemResponse.data.id;

      for (const texto of comentarios) {
        await axios.post('http://localhost:5000/obs', { ordem_id: ordemId, texto });
      }

      alert('Ordem de produção criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar ordem de produção', error);
      alert('Erro ao criar ordem de produção');
    }
  };

  return (
    <div>
      <h1>Criar pedido</h1>
      <div>
        <h2>Pedido</h2>
        <div>
          <div>
            <div className="card-criar">
              <span className="p-float-label">
                <InputText id="nomeProd" value={produtoNome} onChange={(e) => setProdutoNome(e.target.value)} />
                <label htmlFor="nomeProd">Produto</label>
              </span>
              <span className="p-float-label">
                <InputNumber id="quatidade" value={produtoQuantidade} onChange={(e) => setProdutoQuantidade(e.target.value)} />
                <label htmlFor="quantidade">Quantidade</label>
              </span>
            </div>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nome do produto"
            value={produtoNome}
            onChange={(e) => setProdutoNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={produtoQuantidade}
            onChange={(e) => setProdutoQuantidade(e.target.value)}
          />
          <button onClick={handleAddProduto}>Inserir</button>
        </div>
        <div>
          {produtos.map((produto, index) => (
            <div key={index}>
              {produto.nome} - {produto.quantidade}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Comentários</h2>
        <div>
          <div className="card">
            <InputTextarea
              placeholder="Inserir comentário"
              value={comentario}
              onChange={(e) => setComentario({ comentario: e.target.value })} rows={5} cols={30} autoResize />
          </div>
        </div>
        <button onClick={handleAddComentario}>Inserir comentário</button>
        <div className="scrollpanel">
          <div className="card">
            <div className="p-grid">
              <div className="p-col-12 p-md-4">
                <ScrollPanel style={{ width: '100%', height: '200px' }} className="custombar1">
                  <div style={{ padding: '1em', lineHeight: '1.5' }}>
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                    son Michael has just come home from the war, but does not intend to become part of his father's business. Through
                    Michael's life the nature of the family business becomes clear. The business of the family is just like the head
                    of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands
                    against the good of the family.
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                    son Michael has just come home from the war, but does not intend to become part of his father's business. Through Michael's
                    life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind
                    and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the
                    family.
                  </div>
                </ScrollPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleFinalizar}>Finalizar</button>
    </div>
  );
};

export default CriarPage;
