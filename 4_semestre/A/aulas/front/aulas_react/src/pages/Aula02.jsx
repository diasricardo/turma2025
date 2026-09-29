import Botao from "../components/Botao";
import { use, useState } from "react";

export default function Aula02() {
    const [corFundo, setCorFundo] = useState('bg-white')
    const [gradiente, setGradiente] = useState('bg-gradient-to-r')
    const [tamanhoFundo, setTamanhoFundo] =  useState("")
    const [posicaoFundo, setPosicaoFundo] =  useState("")
    const [repeticaoFundo, setRepeticaoFundo] = useState("")
    const [alinhamentoHorizontal, setAlinhamentoHorizontal] = useState('')
    const [alinhamentoVertical, setAlinhamentoVertical] = useState('')

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-700">
                Aula 2 - Background, gradiente e imagens
            </h2>
            <div className="mb-8 p-4 bg-slate-200 rounded">
                <p>
                    Use BG para cores sólidas
                </p>
                <div className= {`${corFundo}`}>{corFundo}</div>
                <h3>Cores de fundo</h3>
                <div className="flex flex-wrap gap-2 my-4">
                    <Botao funcao={setCorFundo} classe={'bg-red-500'} />
                    <Botao funcao={setCorFundo} classe={'bg-green-500'} />
                    <Botao funcao={setCorFundo} classe={'bg-gray-500'} />
                    <Botao funcao={setCorFundo} classe={'bg-yellow-500'} />
                    <Botao funcao={setCorFundo} classe={'bg-purple-500'} />
                </div>
                <div className={`${gradiente} p-4`}>{gradiente}</div>
                <h3>Gradientes Interativos(degrade)</h3>
                <div className="gap-2 m-3">
                    <Botao funcao={setGradiente} classe={'bg-gradient-to-r from-purple-400 to-pink-500'} />
                    <Botao funcao={setGradiente} classe={'bg-gradient-to-r from-purple-200 via-yellow-500 to-blue-500'} />
                </div>
                <h3>Imagens do fundo e seus controles</h3>
                <div className={`h-80 bg-white bg-[url(https://picsum.photos/150)] ${tamanhoFundo} ${posicaoFundo} ${repeticaoFundo}`}></div>
                <div className="flex flex-wrap gap-2 my-4">
                    <Botao funcao={setTamanhoFundo} classe='bg-no-repeat'/>
                    <Botao funcao={setTamanhoFundo} classe='bg-cover'/>
                    <Botao funcao={setTamanhoFundo} classe='bg-contain'/>
                </div>
                <h4>Posição(Background Position)</h4>
                <div className="flex flex-wrap gap-2 my-4">
                    <Botao funcao={setPosicaoFundo} classe='bg-left-top'/>
                    <Botao funcao={setPosicaoFundo} classe='bg-right-top'/>
                    <Botao funcao={setPosicaoFundo} classe='bg-left'/>
                    <Botao funcao={setPosicaoFundo} classe='bg-left-bottom'/>
                    <Botao funcao={setPosicaoFundo} classe='bg-center'/>
                    <Botao funcao={setPosicaoFundo} classe='bg-position-[center_top]'/>
                    <Botao funcao={setPosicaoFundo} classe='bg-position-[20px_40px]'/>
                </div>
                <h3>Repetição</h3>
                <div className="flex flex-wrap gap-2 my-4">
                    <Botao funcao={setRepeticaoFundo} classe='bg-no-repeat'/>
                    <Botao funcao={setRepeticaoFundo} classe='bg-repeat-x'/>
                    <Botao funcao={setRepeticaoFundo} classe='bg-repeat-y'/>
                </div>
            </div>
            <h2 className="text-3xl">Layout e espaçamento</h2>
            <div className="mb-8 p-4 bg-slate-400 rounded">
                <p>Classes paras criar layouts flexiveis. Use justify para alinhar conteudos</p>
                <div className={`flex bg-white h-50 ${alinhamentoHorizontal} ${alinhamentoVertical}`}>
                    <div className="p-4 bg-violet-300 text-white">Item 1</div>
                    <div className="p-4 bg-violet-300 text-white">Item 2</div>
                    <div className="p-4 bg-violet-300 text-white">Item 3</div>
                </div>
                <h3>Alinhamento Horizontal</h3>
                <div className="flex flex-wrap gap-2 my-4">
                    <Botao funcao={setAlinhamentoHorizontal} classe='justify-start' />
                    <Botao funcao={setAlinhamentoHorizontal} classe='justify-center' />
                    <Botao funcao={setAlinhamentoHorizontal} classe='justify-end' />
                    <Botao funcao={setAlinhamentoHorizontal} classe='justify-between' />
                    <Botao funcao={setAlinhamentoHorizontal} classe='justify-around' />
                    <Botao funcao={setAlinhamentoHorizontal} classe='justify-evenly' />
                </div>
                <h3>Alinhamento Vertical</h3>
                <div className="flex flex-wrap gap-2 my-4">
                    <Botao funcao={setAlinhamentoVertical} classe='items-start' />
                    <Botao funcao={setAlinhamentoVertical} classe='items-center' />
                    <Botao funcao={setAlinhamentoVertical} classe='items-end' />
                    <Botao funcao={setAlinhamentoVertical} classe='items-baseline' />
                    <Botao funcao={setAlinhamentoVertical} classe='items-stretch' />
                </div>
            </div>
        </div>
    )
}