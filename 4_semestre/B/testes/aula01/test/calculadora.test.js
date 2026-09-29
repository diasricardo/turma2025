import {soma} from '../calculadora.js'

describe('Testes para realizar calculos matematicos', () => {
    test('Deve somar dois numeros corretamente', () =>{
        expect(soma(3,4)).toBe(7)
    })
})