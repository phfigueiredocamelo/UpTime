import { randomUUID } from "crypto";

import { CurandeirasRepo } from "../../infra/repositories/CurandeirasRepo";

import { Curandeira, Jogador, Periodo } from "../types";

export class CriaCurandeira {

    private collection = new CurandeirasRepo

    async handle(novoJogador: Jogador & { "onlineEntre": Periodo }): Promise<Curandeira> {

        const curandeira: Curandeira = {
            "nome": novoJogador.nome,
            "sobrenome": novoJogador.sobrenome,
            "onlineEntre": novoJogador.onlineEntre,
            "apelido": `CUR_${randomUUID()}`
        }
        
        return this.collection.criar(curandeira).then(() => curandeira)
    }
}
