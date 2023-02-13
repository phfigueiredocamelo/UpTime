import { AgendamentosRespo } from "../../infra/repositories/AgendamentosRepo"
import { CurandeirasRepo } from "../../infra/repositories/CurandeirasRepo"
import { HorasService } from "../services/HorasService"
import { Horas } from "../types"

export class MostrarHorariosDisponiveis {
    private horasService = new HorasService
    private curandeirasRepository = new CurandeirasRepo
    private agendamentosRepository = new AgendamentosRespo

    async handle(apelidoCurandeira: string, data: Date): Promise<Array<Horas>> {
        const curandeira = await this.curandeirasRepository.procurarPeloApelido(apelidoCurandeira)
        
        const comprometimentos = 
            (await this.agendamentosRepository.procurarComCurandeiraNoDia(data, apelidoCurandeira))

        ;console.log(comprometimentos, curandeira);
        
        const periodosComprometidos = comprometimentos.map(agendamento => agendamento.periodo)

        return this.horasService.filtraHorariosDisponiveis(curandeira.onlineEntre, periodosComprometidos)
    }
}
