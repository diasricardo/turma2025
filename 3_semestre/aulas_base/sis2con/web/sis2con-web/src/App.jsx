// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PainelVendas from './pages/PainelVendas';
import ExtratoFiliado from './pages/ExtratoFiliado';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas Diretas */}
        <Route path="/painel-vendas" element={<PainelVendas />} />
        <Route path="/extrato-filiado" element={<ExtratoFiliado />} />
      </Routes>
    </BrowserRouter>
  );
}