
import { expect } from '@jest/globals';
import { Curandeira } from "../../app/domain/types"
import { randomInt, randomUUID } from "crypto";
import { DBConnection } from '../../app/infra/DBConnection';
import { CurandeirasRepo } from '../../app/infra/repositories/CurandeirasRepo';


describe("Curandeiras Repository", () => {
    afterAll(() => DBConnection.close())
    
    it('deve salvar uma curandeira', async () => {
        const repository = new CurandeirasRepo()

        const novaCurandeira: Curandeira = {
            "apelido": `CUR_${randomUUID()}`,
            "nome": "Carlos",
            "sobrenome": "Silva",
            "onlineEntre":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}]
        }
        
        const curandeira = await repository.criar(novaCurandeira)

        expect(curandeira.nome).toBe(novaCurandeira.nome)
        expect(curandeira.sobrenome).toBe(novaCurandeira.sobrenome)
        expect(curandeira.onlineEntre).toBe(novaCurandeira.onlineEntre)
        expect(curandeira.apelido).toBe(novaCurandeira.apelido)
    })

    it('deve retornar uma curandeira pelo apelido', async () => {
        const repository = new CurandeirasRepo()

        const apelidoCurandeira = `GUR_${randomUUID()}`

        await repository.criar({
            "apelido": apelidoCurandeira,
            "nome": "Carlos",
            "sobrenome": "Silva",
            "onlineEntre":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}]
        })
        
        await repository.criar({
            "apelido": `CUR_${randomUUID()}`,
            "nome": "Carlos",
            "sobrenome": "Silva",
            "onlineEntre":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}]
        })

        await repository.criar({
            "apelido": `CUR_${randomUUID()}`,
            "nome": "Carlos",
            "sobrenome": "Silva",
            "onlineEntre":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}]
        })
        
        const curandeira = (await repository.procurarPeloApelido(apelidoCurandeira))

        expect(curandeira.apelido).toEqual(apelidoCurandeira)
    })
})
