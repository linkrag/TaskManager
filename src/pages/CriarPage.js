import React, { useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';
import CustomFloatLabelInput from '../components/CustomFloatLabelInput';
import CustomButton from '../components/CustomButton';
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
      const ordemResponse = await axios.put('http://localhost:5003/ordem', { produtos });
      const ordemId = ordemResponse.data.id;

      for (const texto of comentarios) {
        await axios.put('http://localhost:5003/obs', { ordem_id: ordemId, texto });
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
      <CustomFloatLabelInput
        id={`input-${props.rowIndex}-${field}`}
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(props, e.target.value)}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        textarea={field === 'comentario'}
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
            <CustomFloatLabelInput
              id="inputtext-produto"
              value={newProduto}
              onChange={(e) => setNewProduto(e.target.value)}
              label="Produto"
            />
            <CustomFloatLabelInput
              id="inputtext-quantidade"
              value={newQuantidade}
              onChange={(e) => setNewQuantidade(e.target.value)}
              label="Quantidade"
            />
          </div>
          <CustomButton label="Adicionar Produto" icon="pi pi-plus" onClick={handleAddProduto} />
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
          <CustomFloatLabelInput
            id="textarea-comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            label="Inserir comentário"
            textarea
          />
          <CustomButton
            style={{ marginTop: '0' }}
            label="Inserir comentário"
            icon="pi pi-plus"
            onClick={handleAddComentario}
            className="comment-button"
          />
        </div>
      </div>
      <div className="card-criar" style={{ marginTop: '3%' }}>
        <div className="p-col-12 p-md-4" style={{ marginTop: '2%' }}>
          <ScrollPanel style={{ width: '100%', height: '200px' }} className="custombar1">
            <div style={{ padding: '1em', lineHeight: '1.5' }}>
              {comentarios.map((comentario, index) => (
                <div key={index}>{comentario}</div>
              ))}
            </div>
          </ScrollPanel>
          <CustomButton
            style={{ marginTop: '0' }}
            label="Finalizar"
            icon="pi pi-check"
            onClick={handleFinalizar}
            className="finalizar-button"
          />
        </div>
      </div>
    </div>
  );
};

export default CriarPage;
