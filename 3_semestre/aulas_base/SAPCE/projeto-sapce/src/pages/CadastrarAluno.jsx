import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastrarAluno() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const navigate = useNavigate();

  const handleSalvar = async (e) => {
    e.preventDefault();
    
    if (!nome || !matricula) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, matricula })
      });

      if (resposta.ok) {
        alert("Aluno cadastrado com sucesso!");
        setNome('');
        setMatricula('');
        navigate('/'); // Volta para a home para ver a turma no select
      } else {
        alert("Erro ao cadastrar aluno.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="card">
      <h3>Cadastrar Novo Aluno</h3>
      <form onSubmit={handleSalvar}>
        <div className="form-group">
          <label>Nome Completo do Aluno:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            placeholder="Ex: Arthur Minholi Ferreira"
          />
        </div>

        <div className="form-group">
          <label>Turma / Matrícula:</label>
          <input 
            type="text" 
            value={matricula} 
            onChange={e => setMatricula(e.target.value)} 
            placeholder="Ex: 1/24"
          />
        </div>

        <button type="submit" className="btn-main">Salvar Aluno</button>
      </form>
    </div>
  );
}

export default CadastrarAluno;