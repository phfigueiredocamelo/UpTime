import { Horas, Periodo } from "../types"

export class HorasService {

    verificaDisponibilidade(horas: Horas, disponibilidade: Periodo, comprometimentos: Array<Periodo>): boolean {
        for (let opcao of this.filtraHorariosDisponiveis(disponibilidade, comprometimentos))
            if (this.comparar(opcao, horas))
                return true
        return false
    }

    filtraHorariosDisponiveis(config: Periodo, comprometidos: Array<Periodo>): Array<Horas> {
        let horariosComprometidos = this.geraListaDeHorariosComprometidos(comprometidos)

        let listaDeHorariosDisponiveis = new Array<Horas>
        
        for (let opcao of this.criaOpcoesDeHorarios(config)) {
            let devePermanecer = true
            for (let comprometido of horariosComprometidos) {
                if (this.comparar(opcao, comprometido)) {
                    devePermanecer = false
                }
            }
            if (devePermanecer) listaDeHorariosDisponiveis.push(opcao)
        }

        return listaDeHorariosDisponiveis
    }

    criaOpcoesDeHorarios(periodo: Periodo): Array<Horas> {
        const [inicio, fim] = periodo
        
        let opcao: Horas = { "hora": inicio.hora, "minuto": inicio.minuto }

        let opcoes = new Array<Horas>
        
        while (true) {
            opcoes.push(opcao)

            const proximaHora = this.adicionaHora(opcao, 1)
            
            if (this.comparar(proximaHora, fim)) {
                break
            }

            opcao = this.adicionaMinuto(opcao, 30)
        }

        return opcoes
    }

    geraListaDeHorariosComprometidos(comprometidos: Array<Periodo>): Array<Horas> {
        let listaDeHorariosComprometidos = new Array<Horas>

        comprometidos.forEach((comprometido: Periodo) => {
            const [inicio, fim] = comprometido

            let opcao: Horas = {"hora": inicio.hora, "minuto": inicio.minuto}
           
            opcao = this.removeHora(opcao, 1)
            opcao = this.adicionaMinuto(opcao, 30)

            while (!this.comparar(opcao, fim)) {
                listaDeHorariosComprometidos.push(opcao)
                opcao = this.adicionaMinuto(opcao, 30)
            }
        })

        return listaDeHorariosComprometidos
    }

    adicionaMinuto(horas: Horas, minuto: number): Horas {
        let hr = horas.hora
        let min = horas.minuto
        min += minuto
        if (min >= 60) {
            min -= 60
            hr++
        }
        return {"hora": hr, "minuto": min}
    }

    removeHora(horas: Horas, hora: number): Horas {
        return {"hora": horas.hora - hora, "minuto": horas.minuto }
    }

    adicionaHora(horas: Horas, hora: number): Horas {
        return {"hora": horas.hora + hora, "minuto": horas.minuto }
    }

    comparar(pri: Horas, seg: Horas): boolean {
        return pri.hora == seg.hora && pri.minuto == seg.minuto
    }
}
