import { useState } from "react"
import { Route, Routes, Link } from "react-router-dom";
import TelaLed from "./TelaLed"
import TelaBoia from "./TelaBoia"
import TelaUmidade from "./TelaUmidade";
import {MdClose, MdSettings, MdMenu} from 'react-icons/md'
import {PiHouseBold, PiUserFill} from 'react-icons/pi'
import TelaChuva from "./TelaChuva";
import PaginaCadastroUsuario from "./PaginaCadastroUsuario";

export default function Principal(){
    const [menuAberto, setMenuAberto] = useState(false);

    return(
        <div className="flex h-screen font-sans">
            {/* Sidebar Responsivo */}
            <div className={`fixed z-30 inset-y-0 left-0 transform md:relative md:translate-x-0
            w-64 bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out
            ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold">Menu</span>
                    <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden"><MdClose className="w-5 h-5" /></button>
                </div>
                <nav className="space-y-4">
                    <Link onClick={() => setMenuAberto(false)} to="/telaled" className="flex items-center gap-4 hover:bg-gray-700">
                        <PiHouseBold className="w-8 h-8" />
                        <span>Controle LED</span>
                    </Link>
                        <Link onClick={() => setMenuAberto(false)} to="/telaboia" className="flex items-center gap-4 hover:bg-gray-700">
                        <PiHouseBold className="w-8 h-8" />
                        <span>Controle Boia</span>
                    </Link>
                    <Link onClick={() => setMenuAberto(false)} to="/telaumidade" className="flex items-center gap-4 hover:bg-gray-700">
                        <PiHouseBold className="w-8 h-8" />
                        <span>Controle de umidade</span>
                    </Link>
                    <Link onClick={() => setMenuAberto(false)} to="/telachuva" className="flex items-center gap-4 hover:bg-gray-700">
                        <PiHouseBold className="w-8 h-8" />
                        <span>Controle de Chuva</span>
                    </Link>
                    <Link onClick={() => setMenuAberto(false)} to="/telacadastro" className="flex items-center gap-4 hover:bg-gray-700">
                        <PiHouseBold className="w-8 h-8" />
                        <span>Cadastro Crachá</span>
                    </Link>
                </nav>
            </div>

            {/* Conteudo Principal */}
            <div className="flex-1 p-6 bg-gray-100 text-black w-full overflow-auto">
                <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden mb-4 text-gray-900">
                    <MdMenu className="w-6 h-6" />
                </button>
                <Routes>
                    <Route path="/telaled" element={<TelaLed/>} />
                    <Route path="/telaboia" element={<TelaBoia/>} />
                    <Route path="/telaumidade" element={<TelaUmidade/>} />
                    <Route path="/telachuva" element={<TelaChuva/>} />
                    <Route path="/telacadastro" element={<PaginaCadastroUsuario/>} />
                </Routes>
            </div>
        </div>
    )
}