import mqtt, { MqttClient } from "mqtt";

// ========== CONFIGURAÇÕES DO BROKER ==========
const MQTT_BROKER_HOST = '1fc6157e6caf4d6b86e34770d9f83882.s1.eu.hivemq.cloud';
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = 'ricardodias';
const MQTT_PASSWORD = 'TesteSenai1';

// ========== TÓPICOS ==========
const TOPICO_STATUS = 'aula/36/status';
const TOPICO_ESTADO_LED = 'aula/36/estadoLed';
const TOPICO_NIVEL_BOIA = "aula/36/nivelBoia"
const TOPICO_UMIDADE = "aula/36/umidadeSolo"



// ========== VARIÁVEIS GLOBAIS ==========
let mqttClient = null;          // Guarda a conexão MQTT
let conectado = false;       // Evita conectar 2 vezes ao mesmo tempo
const subscriptions = {};       // Guarda as funções de callback dos tópicos

const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
};

function conectarMqtt(){
    //valida se ja esta conectado
    if(mqttClient?.connected || conectado){
        console.log('MQTT ja conectado')
        return
    }

   
    console.log('MQTT tentando conectar...')
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions)
    conectado = true;

    //Quando conectado com sucesso
    mqttClient.on('connect', () =>{
        console.log('MQTT conectado')

        //inscreve em todos os topicos de uma vez 
        const topicos = [
            TOPICO_STATUS,
            TOPICO_ESTADO_LED,
            TOPICO_NIVEL_BOIA,
            TOPICO_UMIDADE
        ]

        mqttClient.subscribe(topicos, (error) =>{
            if(!error){
                console.log(`MQTT: Inscrito em ${topicos.length} topicos`)
            }
        })
    })
    //Quando rebecer uma mensagem alterada
    mqttClient.on('message', (topic, message) =>{
        //Se existe uma função cadastrada nesse topico, recebe a msg
        if(subscriptions[topic]){
            subscriptions[topic](message.toString())
        }
    })

    //quando escutar um erro
    mqttClient.on('error', (error) =>{
        conectado = false
        console.error('MQTT: Erro -> ', error.message)
    })
    //quando escutar um erro
    mqttClient.on('close', () =>{
        conectado = false
        console.error('MQTT: Conexao fechada ')
    })

    //quando ficar offline
    mqttClient.on('offline', () =>{
        console.error('MQTT: Ficou offline ')
    })
    mqttClient.on('reconnect', () =>{
        console.error('Tentando conexao ')
    })
}

//Função de escuta
function onMessage(topic, callback){
    subscriptions[topic] = callback
}

//função para publicar
function publicar(topic, message){
    //Retorna uma promessa para usar nas rotas
    return new Promise((resolve, reject) =>{
        if(!mqttClient || !mqttClient.connected){
            console.log('MQTT não esta conectado')
            reject(new Error('Cliente MQTT não esta conectado'))
            return;
        }

        mqttClient.publish(topic, message, { retain: true}, (error) =>{
            if(error){
                console.log('MQTT: Erro ao publicar', error.message)
                reject(new Error('Erro ao publicar'))
            }else{
                console.log(`MQTT: Enviado ${topic}: ${message}`)
                resolve(); //deu certo
            }
        })
    })
}

conectarMqtt();

//exportar as funções 
export {
        publicar, 
        onMessage, 
        TOPICO_ESTADO_LED,
        TOPICO_STATUS,
        TOPICO_NIVEL_BOIA,
        TOPICO_UMIDADE
    }