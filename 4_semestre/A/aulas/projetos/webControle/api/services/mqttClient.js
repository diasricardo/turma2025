import mqtt, { connect } from 'mqtt';

//Configurações do Broker
const MQTT_BROKER_HOST = "1fc6157e6caf4d6b86e34770d9f83882.s1.eu.hivemq.cloud"
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = 'ricardodias';
const MQTT_PASSWORD = 'TesteSenai1';
//Topicos que assinaremos
const TOPICO_STATUS = "aula/36/status";
const TOPICO_ESTADO_LED = "aula/36/estadoLed";
const TOPICO_NIVEL_BOIA = "aula/36/nivel";
const TOPICO_UMIDADE_SOLO = "aula/36/umidadeSolo";
const TOPICO_CHUVA = "aula/36/chuva"

//Variaveis globais
let mqttCliente = null; //Guardar a conexao mqtt
let conectado = false;
const subscriptions = {};
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000
}
//Conectar ao Broker
function conectarMqtt(){
    //Se esta conectado nao faz nada
    if(mqttCliente?.connected || conectado)
    {
        console.log('MQTT ja esta conectado ou conectando....')
        return;
    }
    conectado = true;
    mqttCliente = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);
    
    //Quando conectar com sucesso
    mqttCliente.on('connect', () =>{
        conectado = false;
        console.log("MQTT Conectado!");
        //inscreve nos topicos
        const topicos = [
            TOPICO_STATUS,
            TOPICO_ESTADO_LED,
            TOPICO_NIVEL_BOIA,
            TOPICO_UMIDADE_SOLO,
            TOPICO_CHUVA
        ]

        mqttCliente.subscribe(topicos, (erro) =>{
            if(!erro){
                console.log(`MQTT: Inscrito em ${topicos.length} topicos`)
            }
        })
    })
    //Quando receber uma mensagem
    mqttCliente.on('message', (topic, message) =>{
        //se existe a funcao cadastra para o topico ela e chamada
        if(subscriptions[topic]){
            subscriptions[topic](message.toString());
        }
    })
     mqttCliente.on('error', (error) =>{
        conectado = false;
        console.error('MQTT: Erro -> ', error.message)
    })

    mqttCliente.on('offline', () =>{
        console.warn('MQTT offline')
    })

    mqttCliente.on('reconnect', () =>{
        console.log('MQTT tentando reconectar')
    })

    mqttCliente.on('close', () =>{
        conectado = false;
        console.log('MQTT: Conexao fechada')
    })
}

//FUNÇÃO PARA RECEBER AS MENSAGENS
function onMessage(topic, callback){
    subscriptions[topic] = callback;
}

//Função para publicar mensagens
function publicar(topic, message){
    //Retorna uma promisse para usar o await nas rotas
    return new Promise((resolve, reject) => {
        if(!mqttCliente || !mqttCliente.connected){
            console.error('MQTT: não esta conectado')
            reject(new Error('Cliente MQTT nao esta conectado'))
            return;
        }
        mqttCliente.publish(topic, message, {retain: true}, (error) =>{
            if(error){
                console.error('MQTT: Erro ao publicar', error.message);
                reject(new Error('Erro ao publicar'));
            }
            else{
                console.log(`MQTT: Enviado ${topic}: ${message}`)
                resolve(); //Deu certo
            }
        } )
    })
}
conectarMqtt();
//Exportar as funções

export {publicar, onMessage, TOPICO_STATUS, TOPICO_ESTADO_LED, TOPICO_NIVEL_BOIA, TOPICO_UMIDADE_SOLO, TOPICO_CHUVA}
