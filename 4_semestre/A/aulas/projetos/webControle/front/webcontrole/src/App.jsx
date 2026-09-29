import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Principal from './pages/Principal'

export default function App(){
  return(
    <Router>
      <Routes>
        {/* Todas as rotas internas ficam dentro do layout principal */}
        <Route path="/*" element={<Principal />} />
      </Routes>
    </Router>
  )
  
}