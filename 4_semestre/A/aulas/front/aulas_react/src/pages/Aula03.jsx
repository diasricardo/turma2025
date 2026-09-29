import React from "react";
import {PiHouseBold} from "react-icons/pi";
import {TbAppsFilled} from "react-icons/tb";

export default function  Aula03(){
    return(
        <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-400">
                Trabalhando com icones e criando o menu SideBar
            </h1>
            <p>
                <PiHouseBold className="inline w-10 h-10 text-red-500" />
                <TbAppsFilled className="inline w-10 h-10 text-green-500" />
            </p>
        </div>
    )
}