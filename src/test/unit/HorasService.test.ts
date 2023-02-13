import { HorasService } from "../../app/domain/services/HorasService"
import { Horas, Periodo } from "../../app/domain/types"

describe('Horas Serivice Test', () => {
    test('deve criar lista de horas com base em um periodo', () => {
        const horasService = new HorasService
        const periodo: Periodo = [{ hora: 0, minuto: 0 }, { hora: 24, minuto: 0 }] 
        const opcoes: Array<Horas> = horasService.criaOpcoesDeHorarios(periodo)
        
        expect(opcoes).toStrictEqual([
            {"hora": 0, "minuto": 0},
            {"hora": 0, "minuto": 30},
            {"hora": 1, "minuto": 0},
            {"hora": 1, "minuto": 30},
            {"hora": 2, "minuto": 0},
            {"hora": 2, "minuto": 30},
            {"hora": 3, "minuto": 0},
            {"hora": 3, "minuto": 30},
            {"hora": 4, "minuto": 0},
            {"hora": 4, "minuto": 30},
            {"hora": 5, "minuto": 0},
            {"hora": 5, "minuto": 30},
            {"hora": 6, "minuto": 0},
            {"hora": 6, "minuto": 30},
            {"hora": 7, "minuto": 0},
            {"hora": 7, "minuto": 30},
            {"hora": 8, "minuto": 0},
            {"hora": 8, "minuto": 30},
            {"hora": 9, "minuto": 0},
            {"hora": 9, "minuto": 30},
            {"hora": 10, "minuto": 0},
            {"hora": 10, "minuto": 30},
            {"hora": 11, "minuto": 0},
            {"hora": 11, "minuto": 30},
            {"hora": 12, "minuto": 0},
            {"hora": 12, "minuto": 30},
            {"hora": 13, "minuto": 0},
            {"hora": 13, "minuto": 30},
            {"hora": 14, "minuto": 0},
            {"hora": 14, "minuto": 30},
            {"hora": 15, "minuto": 0},
            {"hora": 15, "minuto": 30},
            {"hora": 16, "minuto": 0},
            {"hora": 16, "minuto": 30},
            {"hora": 17, "minuto": 0},
            {"hora": 17, "minuto": 30},
            {"hora": 18, "minuto": 0},
            {"hora": 18, "minuto": 30},
            {"hora": 19, "minuto": 0},
            {"hora": 19, "minuto": 30},
            {"hora": 20, "minuto": 0},
            {"hora": 20, "minuto": 30},
            {"hora": 21, "minuto": 0},
            {"hora": 21, "minuto": 30},
            {"hora": 22, "minuto": 0},
            {"hora": 22, "minuto": 30},
            {"hora": 23, "minuto": 0}
        ])
    })
    
    test('deve listar somente horarios disponiveis', () => {
        const horasService = new HorasService
        
        const periodosComprometidos: Array<Periodo> = [
            [{ hora: 8, minuto: 30 }, { hora: 9, minuto: 30 }],
            [{ hora: 9, minuto: 30 }, { hora: 10, minuto: 30 }],
            [{ hora: 11, minuto: 30 }, { hora: 12, minuto: 30 }],
        ]
        
        const config: Periodo = [{ hora: 8, minuto: 30 }, { hora: 12, minuto: 30 }]

        const horariosDisponiveis = horasService.filtraHorariosDisponiveis(config, periodosComprometidos)

        expect(horariosDisponiveis).toHaveLength(1)

        expect(horariosDisponiveis[0]).toStrictEqual({ hora: 10, minuto: 30})
    })

    test('deve retornar true para horario disponivel', () => {
        const horasService = new HorasService
         
        const periodosComprometidos: Array<Periodo> = [
            [{ hora: 8, minuto: 30 }, { hora: 9, minuto: 30 }],
            [{ hora: 9, minuto: 30 }, { hora: 10, minuto: 30 }],
            [{ hora: 10, minuto: 30 }, { hora: 11, minuto: 30 }],
        ]

        const horas: Horas = { "hora": 11, "minuto": 30 } 

        const config: Periodo = [{ hora: 8, minuto: 30 }, { hora: 12, minuto: 30 }]

        const estaDisponivel = horasService.verificaDisponibilidade(horas, config, periodosComprometidos)
        
        expect(estaDisponivel).toBeTruthy();
     })
    
     test('deve retornar false para horario indisponivel', () => {
        const horasService = new HorasService
         
        const periodosComprometidos: Array<Periodo> = [
            [{ hora: 8, minuto: 30 }, { hora: 9, minuto: 30 }],
            [{ hora: 9, minuto: 30 }, { hora: 10, minuto: 30 }],
            [{ hora: 10, minuto: 30 }, { hora: 11, minuto: 30 }],
        ]

        const horas: Horas = { "hora": 12, "minuto": 0 } 

        const config: Periodo = [{ hora: 8, minuto: 30 }, { hora: 12, minuto: 30 }]

        const estaDisponivel = horasService.verificaDisponibilidade(horas, config, periodosComprometidos)
        
        expect(estaDisponivel).toBeFalsy();
     })

     test('deve adicionar valor em hora', () => {
        const horasService = new HorasService
        const novasHoras = horasService.adicionaHora({ "hora": 1, "minuto": 30 }, 1)
        expect(novasHoras).toStrictEqual({ "hora": 2, "minuto": 30 })         
     })

    test('deve reduzir valor em hora', () => {
        const horasService = new HorasService
        const novasHoras = horasService.removeHora({ "hora": 2, "minuto": 30 }, 1)
        expect(novasHoras).toStrictEqual({ "hora": 1, "minuto": 30 })
    })

    test('deve adicionar valor em minuto', () => {
        const horasService = new HorasService
        const novasHoras = horasService.adicionaMinuto({ "hora": 2, "minuto": 30 }, 30)
        expect(novasHoras).toStrictEqual({ "hora": 3, "minuto": 0 })
    })

    test('deve retornar true para horas iguais', () => {
        const horasService = new HorasService
        const eIgual = horasService.comparar({ "hora": 5, "minuto": 45 }, { "hora": 5, "minuto": 45 })
        expect(eIgual).toBeTruthy
    })

    test('deve retornar false para horas diferentes', () => {
        const horasService = new HorasService
        const eIgual = horasService.comparar({ "hora": 5, "minuto": 45 }, { "hora": 5, "minuto": 46 })
        expect(eIgual).toBeTruthy
    })
})
