import React, { useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './CriarPage.css';

const CriarPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [newProduto, setNewProduto] = useState('');
  const [newQuantidade, setNewQuantidade] = useState('');

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

  const handleAddProduto = () => {
    if (newProduto && newQuantidade) {
      setProdutos([...produtos, { nome: newProduto, quantidade: newQuantidade }]);
      setNewProduto('');
      setNewQuantidade('');
    } else {
      alert('Por favor, preencha ambos os campos antes de adicionar um produto.');
    }
  };

  const onRowEditInit = (event) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [event.index]: { ...produtos[event.index] },
    }));
  };

  const onRowEditCancel = (event) => {
    const newProdutos = [...produtos];
    newProdutos[event.index] = editingRows[event.index];
    delete editingRows[event.index];

    setProdutos(newProdutos);
  };

  const onRowEditSave = (event) => {
    delete editingRows[event.index];
  };

  const onEditorValueChange = (props, value) => {
    const updatedProdutos = [...produtos];
    updatedProdutos[props.rowIndex][props.field] = value;
    setProdutos(updatedProdutos);
  };

  const inputTextEditor = (props, field) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(props, e.target.value)}
      />
    );
  };

  return (
    <div className='criar-page'>
      <h1>Criar pedido</h1>
      <div className="card-criar">
        <div style={{ marginLeft: '3%' }}>
          <h2>Adicionar Produto</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span className="p-float-label">
              <InputText id="inputtext" value={newProduto} onChange={(e) => setNewProduto(e.target.value)} />
              <label htmlFor="inputtext">Produto</label>
            </span>
            <span className="p-float-label">
              <InputText id="inputtext" value={newQuantidade} onChange={(e) => setNewQuantidade(e.target.value)} />
              <label htmlFor="inputtext">Quantidade</label>
            </span>
            <Button label="Adicionar Produto" icon="pi pi-plus" onClick={handleAddProduto} />
          </div>
        </div>
        <div style={{ marginLeft: '5%' }}>
          <h2>Pedido</h2>
          <DataTable
            value={produtos}
            editMode="row"
            dataKey="id"
            onRowEditInit={onRowEditInit}
            onRowEditCancel={onRowEditCancel}
            onRowEditSave={onRowEditSave}
          >
            <Column
              field="nome"
              header="Produto"
              editor={(props) => inputTextEditor(props, 'nome')}
            ></Column>
            <Column
              field="quantidade"
              header="Quantidade"
              editor={(props) => inputTextEditor(props, 'quantidade')}
            ></Column>
            <Column
              rowEditor
              headerStyle={{ width: '7rem' }}
              bodyStyle={{ textAlign: 'center' }}
            ></Column>
          </DataTable>
        </div>
      </div>
        <div className="card-criar">
          <h2>Comentários</h2>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
              <InputTextarea id="textarea" value={comentario} onChange={(e) => setComentario(e.target.value)}
                rows={5}
                cols={30}
                autoResize />
              <label htmlFor="textarea">Inserir comentário</label>
            </span>
            <Button
              label="Inserir comentário"
              icon="pi pi-plus"
              style={{ float: 'right', marginRight: '50%' }}
              onClick={handleAddComentario}
            />
          </div>
        </div>
        <div className="scrollpanel" style={{ marginTop: '2%' }}>
          <div className="card-criar">
            <div className="p-grid">
              <div className="p-col-12 p-md-4">
                {comentarios.map((comentario, index) => (
                  <div key={index}>{comentario}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      <Button
        label="Finalizar"
        icon="pi pi-check"
        style={{ float: 'right', marginRight: '5%' }}
        onClick={handleFinalizar} />
    </div>
  );
};

export default CriarPage;
