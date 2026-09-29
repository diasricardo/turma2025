const idade = 16;

if (idade >= 18) {
    console.log("Você é adulto.");
}
else if(idade <= 13 && idade <=17){
    console.log("Você é adolescente");
}
else if(idade <= 1 && idade <=12){
    console.log("Você é criança");
}
else{
    console.log("Você é bebe");
}

//operador ternario

let nota = 8;

let status = 7;

status = (nota >= 7) ? "Aprovado" : "Reprovado";

console.log(status);


