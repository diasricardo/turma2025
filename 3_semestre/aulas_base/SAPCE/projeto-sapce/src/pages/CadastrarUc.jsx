import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastrarUC() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const navigate = useNavigate();

  const handleSalvar = async (e) => {
    e.preventDefault();

    if (!nome || !sigla) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/uc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sigla })
      });

      if (resposta.ok) {
        alert("Unidade Curricular cadastrada com sucesso!");
        setNome('');
        setSigla('');
        navigate('/');
      } else {
        alert("Erro ao cadastrar UC.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="card">
      <h3>Cadastrar Unidade Curricular (UC)</h3>
      <form onSubmit={handleSalvar}>
        <div className="form-group">
          <label>Nome da Disciplina:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            placeholder="Ex: Lógica de Programação e Algoritmos"
          />
        </div>

        <div className="form-group">
          <label>Sigla da UC:</label>
          <input 
            type="text" 
            value={sigla} 
            onChange={e => setSigla(e.target.value)} 
            placeholder="Ex: LOPAL"
          />
        </div>

        <button type="submit" className="btn-main">Salvar Disciplina</button>
      </form>
    </div>
  );
}

export default CadastrarUC;