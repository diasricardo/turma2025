import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ListaAlunos() {
  const { codigo_turma, id_uc } = useParams(); // Pega os parâmetros passados na URL
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca apenas os alunos daquela turma específica
    fetch(`http://localhost:3000/alunos/turma/${codigo_turma}`)
      .then(res => res.json())
      .then(data => setAlunos(data))
      .catch(err => console.error("Erro ao buscar alunos da turma", err));
  }, [codigo_turma]);

  return (
    <div className="card">
      <button onClick={() => navigate('/')} style={{ marginBottom: '15px', cursor: 'pointer' }}>
        ← Voltar
      </button>
      
      <h3>Alunos da Turma: {codigo_turma}</h3>
      <p style={{ color: '#666' }}>Selecione um aluno para lançar as notas:</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {alunos.map(aluno => (
          <li 
            key={aluno.id_aluno} 
            onClick={() => navigate(`/avaliacao/aluno/${aluno.id_aluno}/uc/${id_uc}`)}
            style={{
              padding: '12px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '4px',
              margin: '5px 0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f4f8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
          >
            <span><strong>{aluno.nome}</strong></span>
            <span style={{ fontSize: '12px', color: '#888' }}>Matrícula: {aluno.matricula}</span>
          </li>
        ))}
        {alunos.length === 0 && <p>Nenhum aluno encontrado para esta turma.</p>}
      </ul>
    </div>
  );
}

export default ListaAlunos;