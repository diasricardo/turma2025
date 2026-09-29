import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate();

    return(
        <div>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-600 
            text-white px-4 py-2 rounded">Entrar</button>
        </div>
    )
}