// src/pages/ExtratoFiliado.jsx
import React, { useState, useEffect } from 'react';

export default function ExtratoFiliado() {
  const [extrato, setExtrato] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Pega o token armazenado no login para autenticar a requisição
  const token = localStorage.getItem('sis2con_token');
  
  // Exemplo: ID do filiado logado que estaria salvo no localStorage
  const usuarioLogado = JSON.parse(localStorage.getItem('sis2con_user'));
  const idFiliado = usuarioLogado?.id_usuario || 1; 

  useEffect(() => {
    const buscarExtrato = async () => {
      try {
        // Faz o GET nativo na sua rota de histórico de vendas do filiado
        const resposta = await fetch(`http://localhost:3000/vendas/extrato/${idFiliado}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.error || 'Erro ao carregar o extrato.');
        }

        setExtrato(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarExtrato();
  }, [idFiliado, token]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Sis2Con - Extrato do Filiado</h2>
        <button 
          onClick={() => window.location.href = '/painel-vendas'}
          style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Voltar ao Terminal
        </button>
      </div>

      {carregando && <p>Carregando suas transações...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {!carregando && !erro && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>ID Venda</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Loja / Convênio</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Data da Compra</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {extrato.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '12px', textAlign: 'center', color: '#666' }}>
                  Nenhuma compra realizada neste mês.
                </td>
              </tr>
            ) : (
              extrato.map((venda) => (
                <tr key={venda.id_venda} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{venda.id_venda}</td>
                  <td style={{ padding: '12px' }}>{venda.loja}</td>
                  <td style={{ padding: '12px' }}>
                    {new Date(venda.data_venda).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#d9534f' }}>
                    R$ {Number(venda.valor_gasto).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}