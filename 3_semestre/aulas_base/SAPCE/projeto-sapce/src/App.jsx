import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ListaAlunos from './pages/ListaAlunos';
import Avaliacao from './pages/Avaliacao';
import CadastrarAluno from './pages/CadastrarAluno';
import CadastrarUC from './pages/CadastrarUc';
import CadastrarCriterio from './pages/CadastrarCriterio'; // Nova
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container-app">
        <header>
          <h2>SENAI - Avaliação por Competências</h2>
          <nav style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px', fontSize: '14px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link> | 
            <Link to="/cadastro-aluno" style={{ color: '#fff', textDecoration: 'none' }}>+ Aluno</Link> | 
            <Link to="/cadastro-uc" style={{ color: '#fff', textDecoration: 'none' }}>+ Disciplina</Link> |
            <Link to="/cadastro-criterio" style={{ color: '#fff', textDecoration: 'none' }}>+ Critério</Link>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turma/:codigo_turma/uc/:id_uc" element={<ListaAlunos />} />
          <Route path="/avaliacao/aluno/:id_aluno/uc/:id_uc" element={<Avaliacao />} />
          <Route path="/cadastro-aluno" element={<CadastrarAluno />} />
          <Route path="/cadastro-uc" element={<CadastrarUC />} />
          <Route path="/cadastro-criterio" element={<CadastrarCriterio />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;