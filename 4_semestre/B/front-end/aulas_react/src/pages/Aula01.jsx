import { useState } from "react"

export default function Aula01(){
    const [tamanhoFonte, setTamanhoFonte] = useState('text-base')
    

    return(
        <div className=" bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center">Tailwind CSS</h1>
            <h2>Demonstração interativa</h2>
            <div className="mb-8 p-4 bg-slate-200 rounded">
                <p className={`${tamanhoFonte}`}>
                    Texto Exemplo {tamanhoFonte}
                </p>
                <h3>
                    Tamanhos do Texto
                </h3>
                <button onClick={() => setTamanhoFonte('text-sm')} className="px- py-1 bg-sky-500 text-white rounded mr-2">text-xs (12px)</button>
                <button onClick={() => setTamanhoFonte('text-xs')} className="px- py-1 bg-sky-500 text-white rounded mr-2">text-xl (14px)</button>
            </div>
        </div>
    )
}