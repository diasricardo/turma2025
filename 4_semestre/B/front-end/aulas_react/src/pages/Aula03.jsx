import { PiHouseBold } from "react-icons/pi";
import { GiAbstract005 } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi";
import { Si1001Tracklists } from "react-icons/si";
export default function Aula03(){
    return(
        <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-800">Trabalhando com icones e criando o menu Sidebar</h1>
            <p>
                <PiHouseBold className="inline w-10 h-10 text-red-500" />
                <GiAbstract005 className="inline w-10 h-10 text-green-500" />
                <HiAcademicCap className="inline w-10 h-10 text-pink-500" />
                <Si1001Tracklists className="inline w-40 h-40 text-blue-500" />
            </p>
        </div>
    )
}