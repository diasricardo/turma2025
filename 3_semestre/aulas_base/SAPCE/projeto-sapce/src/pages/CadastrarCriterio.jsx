import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastrarCriterio() {
  const [unidades, setUnidades] = useState([]);
  const [ucSelecionada, setUcSelecionada] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoCriterio, setTipoCriterio] = useState('C'); // 'C' por padrão
  const navigate = useNavigate();

  // Carrega as disciplinas para vincular o critério corretamente
  useEffect(() => {
    fetch('http://localhost:3000/uc')
      .then(res => res.json())
      .then(data => setUnidades(data))
      .catch(err => console.error("Erro ao buscar UCs", err));
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();

    if (!ucSelecionada || !capacidade || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    const dados = {
      unidade_curricular_id: parseInt(ucSelecionada),
      capacidade,
      descricao,
      tipo_criterio: tipoCriterio
    };

    try {
      const resposta = await fetch('http://localhost:3000/criterios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (resposta.ok) {
        alert("Critério cadastrado com sucesso!");
        setCapacidade('');
        setDescricao('');
      } else {
        alert("Erro ao cadastrar critério.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="card">
      <h3>Cadastrar Critério de Avaliação</h3>
      <form onSubmit={handleSalvar}>
        <div className="form-group">
          <label>Vincular à Unidade Curricular:</label>
          <select value={ucSelecionada} onChange={e => setUcSelecionada(e.target.value)}>
            <option value="">-- Escolha a Disciplina --</option>
            {unidades.map(u => (
              <option key={u.id} value={u.id}>{u.sigla} - {u.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Capacidade (Título):</label>
          <input 
            type="text" 
            value={capacidade} 
            onChange={e => setCapacidade(e.target.value)} 
            placeholder="Ex: 1. Identificar a sequência lógica"
          />
        </div>

        <div className="form-group">
          <label>Descrição do Critério (Pergunta):</label>
          <textarea 
            value={descricao} 
            onChange={e => setDescricao(e.target.value)} 
            placeholder="Ex: O aluno descreveu os passos necessários para solução?"
            rows="3"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div className="form-group">
          <label>Tipo de Critério:</label>
          <select value={tipoCriterio} onChange={e => setTipoCriterio(e.target.value)}>
            <option value="C">Crítico (Retém abaixo de 100%)</option>
            <option value="D">Desejável (Gera pontuação proporcional)</option>
          </select>
        </div>

        <button type="submit" className="btn-main">Salvar Critério</button>
      </form>
    </div>
  );
}

export default CadastrarCriterio;