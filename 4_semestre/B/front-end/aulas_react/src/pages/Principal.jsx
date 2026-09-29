import { Routes, Route, Link } from 'react-router-dom'
import Aula01 from './Aula01'
import Aula02 from './Aula02'
import Aula03 from './Aula03'
import { useState } from 'react'
import{MdClose, MdSettings, MdMenu} from "react-icons/md"
import { PiHouseBold, PiUserFill } from "react-icons/pi";

export default function Principal(){
    const [menuAberto, setMenuAberto] = useState(false);

    return(
        <div className='flex h-screen font-sans'>
            {/* Sidebar Responsivo */}
            <div className={`fixed z-30 inset-y-0 left-0 transform md:relative md:translate-x-0 w-64
             bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out
             ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`} >

                <div className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-bold'>Menu</span>
                    <button onClick={() => setMenuAberto(!menuAberto)} className='md:hidden'>
                        <MdClose className='w-5 h-5'/>
                    </button>
                 </div>
                    <nav className='space-y-4'>
                        <Link onClick={() => setMenuAberto(false)} to="/aula01" className='flex items-center gap-4 hover:bg-gray-700 p-2 rounded'>
                            <PiHouseBold />
                            <span>Aula 01</span>
                        </Link>
                        <Link onClick={() => setMenuAberto(false)} to="/aula02" className='flex items-center gap-4 hover:bg-gray-700 p-2 rounded'>
                            <PiUserFill />
                            <span>Aula 02</span>
                        </Link>
                        <Link onClick={() => setMenuAberto(false)} to="/aula03" className='flex items-center gap-4 hover:bg-gray-700 p-2 rounded'>
                            <MdSettings />
                            <span>Aula 03</span>
                        </Link>
                    </nav>
            </div>

            {/* Conteudo tela principal */}
            <div className='flex-1 p-6 bg-gray-100 text-black w-full overflow-auto'>
                <button onClick={() => setMenuAberto(!menuAberto)} className='md:hidden mb-4 text-gray-900'>
                    <MdMenu className="w-6 h-6" />
                </button>
            <Routes>
                <Route path='/' element={<Aula01 />} />
                <Route path='/aula01' element={<Aula01 />} />
                <Route path='/aula02' element={<Aula02 />} />
                <Route path='/aula03' element={<Aula03 />} />
            </Routes>
            </div>
        </div>
    )
}