
import { expect } from '@jest/globals';
import { AgendamentosRespo } from "../../app/infra/repositories/AgendamentosRepo"
import { Agendamento } from "../../app/domain/types"
import { randomInt, randomUUID } from "crypto";
import { DBConnection } from '../../app/infra/DBConnection';


describe("Agendamentos Repository", () => {
    afterAll(() => DBConnection.close())
    
    it('deve salvar um agendamento', async () => {
        const repository = new AgendamentosRespo()

        const novoAgendamento: Agendamento = {
            "data": new Date,
            "periodo":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}],
            "dungeon": { "apelidoCurandeira": "", "apelidoGuerreiro": "" }
        }
        
        const agendamento = await repository.salvar(novoAgendamento)

        expect(agendamento.data).toBe(novoAgendamento.data)
        expect(agendamento.periodo).toBe(novoAgendamento.periodo)
        expect(agendamento.dungeon).toBe(novoAgendamento.dungeon)
    })

    it('deve retornar uma lista de agendamentos de uma Curandeira em um dia específico', async () => {
        const repository = new AgendamentosRespo()

        const apelidoCurandeira = `GUR_${randomUUID()}`
        const dia: Date = new Date(Date.parse("2023-02-12"))

        await repository.salvar({
            "data": dia,
            "periodo":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}],
            "dungeon": { "apelidoCurandeira": apelidoCurandeira, "apelidoGuerreiro": `GUR_${randomUUID()}` }
        })
        
        await repository.salvar({
            "data": dia,
            "periodo":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}],
            "dungeon": { "apelidoCurandeira": apelidoCurandeira, "apelidoGuerreiro": `GUR_${randomUUID()}` }
        })

        await repository.salvar({
            "data": new Date(Date.parse("2023-02-11")),
            "periodo":  [{hora: randomInt(23), minuto: randomInt(59)}, {hora: randomInt(23), minuto: randomInt(59)}],
            "dungeon": { "apelidoCurandeira": apelidoCurandeira, "apelidoGuerreiro": `GUR_${randomUUID()}` }
        })
        
        const agendamentos = (await repository.procurarComCurandeiraNoDia(dia, apelidoCurandeira))

        expect(agendamentos).toHaveLength(2)

        agendamentos.forEach(agendamento => {
            expect(agendamento.data).toEqual(dia)
        })
    })
})
