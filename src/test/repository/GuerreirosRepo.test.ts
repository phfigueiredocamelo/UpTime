
import { expect } from '@jest/globals';
import { Guerreiro } from "../../app/domain/types"
import { randomUUID } from "crypto";
import { DBConnection } from '../../app/infra/DBConnection';
import { GuerreirosRepo } from '../../app/infra/repositories/GuerreirosRepo';

describe("Guerreiros Repository", () => {
    afterAll(() => DBConnection.close())
    
    it('deve salvar um guerreiro', async () => {
        const repository = new GuerreirosRepo()

        const novoGuerreiro: Guerreiro = {
            "apelido": `CUR_${randomUUID()}`,
            "nome": "Carlos",
            "sobrenome": "Silva",
        }
        
        const guerreiro = await repository.criar(novoGuerreiro)

        expect(guerreiro.nome).toBe(novoGuerreiro.nome)
        expect(guerreiro.sobrenome).toBe(novoGuerreiro.sobrenome)
        expect(guerreiro.apelido).toBe(novoGuerreiro.apelido)
    })
})
