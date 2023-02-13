import { randomUUID } from "crypto";
import { GuerreirosRepo } from "../../infra/repositories/GuerreirosRepo";
import { Guerreiro, Jogador } from "../types";

export class CriaGuerreiro {

    private collection = new GuerreirosRepo

    async handle(novoJogador: Jogador): Promise<Guerreiro> {
        const guerreiro: Guerreiro = {
            "nome": novoJogador.nome,
            "sobrenome": novoJogador.sobrenome,
            "apelido": `GUR_${randomUUID()}`
        }
        return this.collection.criar(guerreiro).then(() => guerreiro)
    }
}
