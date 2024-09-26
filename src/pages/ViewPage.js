import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from '../components/CustomButton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './CriarPage.css';
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const EditarPage = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await axios.get(`http://localhost:5003/ordem/${id}`);
                const data = response.data.ordens[0];
                setPedido(data);
                setComentarios(data.obs || []);
            } catch (error) {
                console.error('Error fetching order from server:', error);
            }
        };

        fetchPedido();
    }, [id]);

    const handleAddComentario = () => {
        if (comentario) {
            setComentarios([...comentarios, { texto: comentario }]);
            setComentario('');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (!pedido) {
        return <div>Loading...</div>;
    }

    return (
        <div className='criar-page'>
            <Button
                icon="pi pi-print"
                style={{ float: 'right', marginRight: '17%', backgroundColor: 'white', color: 'black' }}
                onClick={handlePrint} />
            <h1>Visualizar pedido</h1>
            <div className="card-criar">
                <div style={{ marginLeft: '5%' }}>
                    <h2>Pedido {pedido.id}</h2>
                    <DataTable value={pedido.produtos} scrollable scrollHeight="200px">
                        <Column field="nome" header="Produto"></Column>
                        <Column field="quantidade" header="Quantidade"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="card-criar">
                <h2>Comentários</h2>
                <div className="p-field p-col-12 p-md-4">
                    <span className="p-float-label">
                        <InputTextarea
                            id="textarea"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            rows={5}
                            cols={30}
                            autoResize
                        />
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
                                <div key={index}>{comentario.texto}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarPage;
