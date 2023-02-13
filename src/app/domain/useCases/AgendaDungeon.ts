import { AgendamentosRespo } from "../../infra/repositories/AgendamentosRepo"
import { CurandeirasRepo } from "../../infra/repositories/CurandeirasRepo"
import { HorasService } from "../services/HorasService"
import { Agendamento, Horas, Periodo } from "../types"

export class AgendaDungeon {
    private horasService = new HorasService
    private agendamentosRepository = new AgendamentosRespo
    private curandeirasRepository = new CurandeirasRepo

    async handle(apelidoCurandeira: string, apelidoGuerreiro: string, agenda: [Date, Periodo]): Promise<Agendamento> {
        const [data, periodo] = agenda
        const [inicio, _] = periodo

        const curandeira = (await this.curandeirasRepository.procurarPeloApelido(apelidoCurandeira))
        
        const comprometimentos = 
            (await this.agendamentosRepository.procurarComCurandeiraNoDia(data, apelidoCurandeira)) as Array<Agendamento>

        const periodosComprometidos = comprometimentos.map(agendamento => agendamento.periodo)

        if (!this.horasService.verificaDisponibilidade(inicio, curandeira.onlineEntre, periodosComprometidos))
            throw new Error
        
        const agendamento: Agendamento = { 
            "dungeon": {
                "apelidoCurandeira": apelidoCurandeira,
                "apelidoGuerreiro": apelidoGuerreiro
            },
            "data": data,
            "periodo": periodo
        }

        return this.agendamentosRepository.salvar(agendamento).then(() => agendamento)
    }
}
