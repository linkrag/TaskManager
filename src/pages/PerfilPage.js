import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import CustomFloatLabelInput from '../components/CustomFloatLabelInput';
import CustomButton from '../components/CustomButton';
import './PerfilPage.css';

const PerfilPage = () => {
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [empresaId, setEmpresaId] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to decode the JWT token and get the user ID
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (token) {
            const decoded = jwtDecode(token); // Decode the JWT token to extract the payload
            return decoded.id; // Extract the user ID (or other info as needed)
        }
        return null;
    };

    useEffect(() => {
        // Fetch user data using the decoded user ID
        const userId = getUserIdFromToken();
        if (!userId) {
            setError('User not authenticated.');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/usuario/${userId}`);
                const userData = response.data;

                setNome(userData.nome);
                setUsername(userData.username);
                setCep(userData.cep);
                setLogradouro(userData.logradouro);
                setComplemento(userData.complemento);
                setBairro(userData.bairro);
                setLocalidade(userData.localidade);
                setUf(userData.uf);
                setEmpresaId(userData.empresa_id);
                setDataCriacao(userData.data_criacao);
            } catch (err) {
                setError('Failed to load user data.');
            }
        };

        fetchUserData();
    }, []);

    // Function to search CEP and populate fields
    const handleCepBlur = async () => {
        try {
            console.log("OI")
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;

            if (!data.erro) {
                setLogradouro(data.logradouro || '');
                setBairro(data.bairro || '');
                setLocalidade(data.localidade || '');
                setComplemento(data.complemento || '');
                setUf(data.uf || '');
            } else {
                setError('CEP não encontrado.');
            }
        } catch (err) {
            setError('Erro ao buscar o CEP.');
        }
    };

    const handleDelete = async () => {
        const userId = getUserIdFromToken();
        if (!userId) {
            setError('User not authenticated.');
            return;
        }

        try {
            await axios.delete(`http://localhost:5002/usuario/${userId}`);
            alert('User deleted successfully!');
            localStorage.removeItem('token'); // Remove the token after deletion
            navigate('/'); // Redirect to home or login page after deletion
        } catch (err) {
            setError('Failed to delete user. Please try again.');
        }
    };

    return (
        <div className="perfil-page">
            <h1>Perfil do Usuário</h1>
            <div className="perfil-card">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <CustomFloatLabelInput
                    id="inputtext-nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    label="Nome"
                    disabled
                />
                <CustomFloatLabelInput
                    id="inputtext-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                    disabled
                />
                <CustomFloatLabelInput
                    id="inputtext-cep"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={handleCepBlur}
                    label="CEP"
                />
                <CustomFloatLabelInput
                    id="inputtext-logradouro"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    label="Logradouro"
                />
                <CustomFloatLabelInput
                    id="inputtext-complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    label="Complemento"
                />
                <CustomFloatLabelInput
                    id="inputtext-bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    label="Bairro"
                />
                <CustomFloatLabelInput
                    id="inputtext-localidade"
                    value={localidade}
                    onChange={(e) => setLocalidade(e.target.value)}
                    label="Localidade"
                />
                <CustomFloatLabelInput
                    id="inputtext-uf"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    label="UF"
                />
                <CustomFloatLabelInput
                    id="inputtext-empresa"
                    value={empresaId}
                    label="Empresa ID"
                    disabled
                />
                <CustomFloatLabelInput
                    id="inputtext-data-criacao"
                    value={dataCriacao}
                    label="Data de Criação"
                    disabled
                />
                <CustomButton
                    label="Excluir Usuário"
                    icon="pi pi-user-minus"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
};

export default PerfilPage;