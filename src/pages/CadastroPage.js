import React, { useState } from 'react';
import axios from 'axios';
import CustomFloatLabelInput from '../components/CustomFloatLabelInput';
import CustomButton from '../components/CustomButton';
import './CadastroPage.css';
import CryptoJS from 'crypto-js';

const CadastroPage = () => {
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const encryptedPassword = CryptoJS.SHA256(password).toString();

        try {
            await axios.put('http://localhost:5002/usuario', {
                nome,
                username,
                pwd: encryptedPassword,
                cep,
                logradouro,
                complemento,
                bairro,
                localidade,
                uf,
                empresa_id: 1, // Update as needed
            });
            alert('User registered successfully!');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="cadastro-page">
            <h1>Novo Usuário</h1>
            <div className="cadastro-card">
                <form onSubmit={handleRegister}>
                    <CustomFloatLabelInput
                        id="inputtext-nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        label="Nome"
                    />
                    <CustomFloatLabelInput
                        id="inputtext-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                    />
                    <CustomFloatLabelInput
                        id="inputtext-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                    />
                    <CustomFloatLabelInput
                        id="inputtext-cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <CustomButton label="Registrar" icon="pi pi-user-plus" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default CadastroPage;