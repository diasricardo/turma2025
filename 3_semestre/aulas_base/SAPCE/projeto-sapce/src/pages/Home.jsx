import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [turmas, setTurmas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [ucSelecionada, setUcSelecionada] = useState('');
  
  const navigate = useNavigate();

  // Carrega as turmas e UCs ao abrir a tela
  useEffect(() => {
    // Busca as turmas únicas
    fetch('http://localhost:3000/turmas')
      .then(res => res.json())
      .then(data => setTurmas(data))
      .catch(err => console.error("Erro ao buscar turmas", err));

    // Busca as Unidades Curriculares
    fetch('http://localhost:3000/uc')
      .then(res => res.json())
      .then(data => setUnidades(data))
      .catch(err => console.error("Erro ao buscar UCs", err));
  }, []);

  const handleAvancar = (e) => {
    e.preventDefault();
    if (turmaSelecionada && ucSelecionada) {
      // Navega para a lista de alunos passando os parâmetros na URL
      navigate(`/turma/${turmaSelecionada}/uc/${ucSelecionada}`);
    } else {
      alert("Por favor, selecione a Turma e a Unidade Curricular.");
    }
  };

  return (
    <div className="card">
      <h3>Iniciar Avaliação</h3>
      <form onSubmit={handleAvancar}>
        <div className="form-group">
          <label>Selecione a Turma:</label>
          <select value={turmaSelecionada} onChange={e => setTurmaSelecionada(e.target.value)}>
            <option value="">-- Escolha a Turma --</option>
            {turmas.map((t, idx) => (
              <option key={idx} value={t.turma}>{t.turma}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Selecione a Unidade Curricular:</label>
          <select value={ucSelecionada} onChange={e => setUcSelecionada(e.target.value)}>
            <option value="">-- Escolha a UC --</option>
            {unidades.map(u => (
              <option key={u.id} value={u.id}>{u.sigla} - {u.nome}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-main">Ver Alunos</button>
      </form>
    </div>
  );
}

export default Home;