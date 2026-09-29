// src/pages/PainelVendas.jsx
import React, { useState, useEffect } from 'react';

export default function PainelVendas() {
  // Verificação de segurança nativa e isolada para evitar erros com Hooks de Router globais
  useEffect(() => {
    const token = localStorage.getItem('sis2con_token');
    if (!token) {
      window.location.href = '/'; // Redireciona imediatamente se não estiver autenticado
    }
  }, []);

  const [codigoFuncionario, setCodigoFuncionario] = useState('');
  const [valorGasto, setValorGasto] = useState('');
  const [filiado, setFiliado] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const token = localStorage.getItem('sis2con_token');

  // RF04 - Consulta rápida de saldo enviando o Token JWT no cabeçalho
  const verificarFiliado = async () => {
    if (!codigoFuncionario) return;
    setMensagem({ tipo: '', texto: '' });

    try {
      const resposta = await fetch(`http://localhost:3000/filiados/saldo/${codigoFuncionario}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.message || 'Filiado não encontrado.');
      }

      setFiliado(dados);
    } catch (err) {
      setFiliado(null);
      setMensagem({ tipo: 'erro', texto: err.message });
    }
  };

  // RF05 - Efetuar o lançamento da venda com a validação transacional do back-end
  const efetuarVenda = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    try {
      const resposta = await fetch('http://localhost:3000/vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_empresa: 1, // Exemplo: vindo do contexto da loja logada
          codigo_funcionario: codigoFuncionario,
          valor_gasto: parseFloat(valorGasto)
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.message || 'Erro ao processar transação.');
      }

      setMensagem({ tipo: 'sucesso', texto: dados.message });
      setCodigoFuncionario('');
      setValorGasto('');
      setFiliado(null);
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.message });
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', fontFamily: 'sans-serif' }}>
      <h3>Sis2Con - Terminal do Lojista</h3>
      
      <form onSubmit={efetuarVenda} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Código do Filiado:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={codigoFuncionario} 
              onChange={(e) => setCodigoFuncionario(e.target.value)}
              required
              style={{ flex: 1, padding: '8px' }}
            />
            <button type="button" onClick={verificarFiliado} style={{ padding: '8px', cursor: 'pointer' }}>
              Verificar Saldo
            </button>
          </div>
        </div>

        {/* Feedback visual instantâneo do saldo guardado na Entidade */}
        {filiado && (
          <div style={{ padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <p style={{ margin: '0 0 5px 0' }}><strong>Nome:</strong> {filiado.nome}</p>
            <p style={{ margin: '0' }}><strong>Limite Disponível:</strong> R$ {filiado.limite_disponivel}</p>
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Valor do Cupom/Venda (R$):</label>
          <input 
            type="number" 
            step="0.01" 
            value={valorGasto} 
            onChange={(e) => setValorGasto(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Confirmar Venda
        </button>
      </form>

      {mensagem.texto && (
        <div style={{ marginTop: '15px', padding: '10px', color: 'white', backgroundColor: mensagem.tipo === 'sucesso' ? '#28a745' : '#dc3545', borderRadius: '4px', fontWeight: 'bold' }}>
          {mensagem.texto}
        </div>
      )}
    </div>
  );
}