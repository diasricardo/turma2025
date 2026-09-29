import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Avaliacao() {
  const { id_aluno, id_uc } = useParams();
  const [criterios, setCriterios] = useState([]);
  const [respostas, setRespostas] = useState({}); // Guarda o estado dos checkboxes { criterio_id: true/false }
  const [observacoes, setObservacoes] = useState({}); // Guarda o texto das observações
  const navigate = useNavigate();

  useEffect(() => {
    // Como seu backend usa a sigla ou ID, vamos buscar os critérios da UC
    // Ajuste a rota de acordo com a sua rota de critérios. Se for por id, mude para /criterios/${id_uc}
    fetch(`http://localhost:3000/criterios/${id_uc}`)
      .then(res => res.json())
      .then(data => {
        setCriterios(data);
        // Inicializa todas as respostas como false (não atingiu)
        const inicial = {};
        data.forEach(c => { inicial[c.id] = false; });
        setRespostas(inicial);
      })
      .catch(err => console.error("Erro ao buscar critérios", err));
  }, [id_uc]);

  const handleCheckboxChange = (id) => {
    setRespostas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleObsChange = (id, texto) => {
    setObservacoes(prev => ({ ...prev, [id]: texto }));
  };

  const salvarAvaliacao = async () => {
    // Monta o array de itens estruturado exatamente como o backend espera
    const itensEnvia = criterios.map(c => ({
      criterio_id: c.id,
      tipo_criterio: c.tipo_criterio,
      atingiu: respostas[c.id],
      observacao: observacoes[c.id] || ""
    }));

    const dadosFormatados = {
      aluno_id: parseInt(id_aluno),
      unidade_curricular_id: parseInt(id_uc),
      itens: itensEnvia
    };

    try {
      const resposta = await fetch('http://localhost:3000/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFormatados)
      });
      
      const resultado = await resposta.json();
      
      if (resposta.ok) {
        alert(`Avaliação salva com sucesso! Nota Calculada: ${resultado.nota_calculada}`);
        navigate(-1); // Volta para a lista de alunos
      } else {
        alert(`Erro ao salvar: ${resultado.error}`);
      }
    } catch (error) {
      console.error("Erro na requisição", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="card">
      <button onClick={() => navigate(-1)} style={{ marginBottom: '15px', cursor: 'pointer' }}>
        ← Voltar para Chamada
      </button>

      <h3>Avaliação de Competências</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>Marque os critérios atendidos pelo estudante:</p>

      {criterios.map(c => (
        <div key={c.id} style={{
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          marginBottom: '15px',
          backgroundColor: c.tipo_criterio === 'C' ? '#fff5f5' : '#f5f9ff' // Vermelho claro para crítico, azul claro para desejável
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={respostas[c.id] || false} 
              onChange={() => handleCheckboxChange(c.id)}
              style={{ width: '20px', height: '20px', marginTop: '2px', cursor: 'pointer' }}
            />
            <div>
              <span style={{
                fontSize: '11px',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '4px',
                color: '#fff',
                backgroundColor: c.tipo_criterio === 'C' ? '#dc3545' : '#007bff',
                marginRight: '5px'
              }}>
                {c.tipo_criterio === 'C' ? 'CRÍTICO' : 'DESEJÁVEL'}
              </span>
              <strong>{c.capacidade}</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#444' }}>{c.descricao}</p>
            </div>
          </div>
          
          <input 
            type="text" 
            placeholder="Observação (opcional)..." 
            value={observacoes[c.id] || ""}
            onChange={(e) => handleObsChange(c.id, e.target.value)}
            style={{ marginTop: '10px', padding: '6px', fontSize: '13px' }}
          />
        </div>
      ))}

      {criterios.length === 0 && <p>Nenhum critério encontrado para esta disciplina.</p>}

      <button onClick={salvarAvaliacao} className="btn-main" style={{ marginTop: '15px' }}>
        Gravar Avaliação e Calcular Nota
      </button>
    </div>
  );
}

export default Avaliacao;