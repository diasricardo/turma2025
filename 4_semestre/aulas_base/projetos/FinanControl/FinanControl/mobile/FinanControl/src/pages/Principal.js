import { useState, useEffect } from "react"
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Principal({ navigation }) {
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if (usuarioLogado != null) {
                setDadosLogin(JSON.parse(usuarioLogado))
            }
        }
        buscarUsuario()
    }, [])

    function botaoLogout () {
        AsyncStorage.removeItem('UsuarioLogado')
        navigation.navigate('Login')
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent:'space-between',
                padding: 10
             }}>
                <Text>Usuário: {dadosLogin?.usuario?.nome} </Text>
                <Button onPress={botaoLogout} title='Sair' />
            </View>
        </View>
    )
}