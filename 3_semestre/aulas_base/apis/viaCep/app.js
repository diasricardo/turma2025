import express from 'express';

const app = express();


// (A) Servir arquivos estáticos da pasta "public"
//Adicionar depois junto com a api doguinho
// app.use(express.static('public'));
app.use('/dogs', express.static('public'))


app.get('/', async (req, res) =>{
    res.json("API Funcionando")
})

app.get('/cep/:codigo', async (req, res) => {
    // recebe os valores atraves dos parametros enviados no endpoint
  const codigo = req.params.codigo;

  //fetch('buscar') é o “mensageiro” que vai até outra API, traz a resposta, e coloca dentro do seu programa.

  const resposta = await fetch(`https://viacep.com.br/ws/${codigo}/json/`);
  const dados = await resposta.json();

  //Caso eu queira retornar valores especificos do objeto
  
//   const cidade = dados.localidade;
//   const estado = dados.uf;


//   res.json({dados, cidade, estado});
  res.json(dados);
});




//Atividade Star Wars

// Endpoint: GET /starwars/personagem/:id
// Ex.: /starwars/personagem/1  -> Luke Skywalker
app.get('/starwars/personagem/:id', async (req, res) => {
  const { id } = req.params;

  const resposta = await fetch(`https://swapi.dev/api/people/${id}/`);
  const dados = await resposta.json();

  // JSON simplificado: apenas alguns campos
  const resultado = {
    nome: dados.name,
    altura: dados.height,
    peso: dados.mass,
    cor_dos_olhos: dados.eye_color
  };

  res.json(resultado);
});

app.get('/dog/:status', (req, res) => {
  const { status } = req.params;
  const url = `https://http.dog/${status}.jpg`;
  res.json({ url });
});


const porta = 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando em: http://localhost:${porta}`);
});