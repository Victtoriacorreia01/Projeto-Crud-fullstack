import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'; 
import logoAtena from '../assets/Blue__white_and_green_Medical_care_logo__1_-removebg-preview.png';
import loginBanner from '../assets/Post do instagram dia do médico ilustrado azul (1).png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const [erros, setErros] = useState({ email: '', senha: '' });

  const validarCampos = () => {
    const novosErros = { email: '', senha: '' };
    let valido = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      novosErros.email = 'O e-mail é obrigatório.';
      valido = false;
    } else if (!emailRegex.test(email)) {
      novosErros.email = 'Formato de e-mail inválido.';
      valido = false;
    }

    if (!senha) {
      novosErros.senha = 'A senha é obrigatória.';
      valido = false;
    }

    setErros(novosErros);
    return valido;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErroGeral('');
    
    if (!validarCampos()) return;

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, senha });
      if (response.data.sucesso) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } else {
        setErroGeral('Credenciais inválidas');
      }
    } catch (err) {
      setErroGeral('Erro ao tentar logar');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <img src={loginBanner} alt="Login Banner" className="login-banner" />
        </div>

        <div className="login-right">
          <img src={logoAtena} alt="Logo Atena" className="imglogo" />
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {erros.email && <p className="error-msg">{erros.email}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {erros.senha && <p className="error-msg">{erros.senha}</p>}
            </div>

            <button type="submit" className="login-button">Login</button>

            {erroGeral && <p className="error-msg center">{erroGeral}</p>}
          </form>

          <p className="signup-link">
            Não tem uma conta? <a href="#">Cadastre-se aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
