import { Agendamento } from "../../domain/types"
import { DBConnection } from "../DBConnection";

export class AgendamentosRespo {
    private REPOSITORY_NAME = "agendamentos"

    async salvar(agendamento: Agendamento): Promise<Agendamento> {
        const conn = await DBConnection.connect()
        await conn.db("uptimes").collection(this.REPOSITORY_NAME).insertOne(agendamento)
        return agendamento
    }

    async procurarComCurandeiraNoDia(data: Date, apelidoCurandeira: string): Promise<Array<Agendamento>> {
        const conn = await DBConnection.connect()
        return await conn.db("uptimes").collection(this.REPOSITORY_NAME).find<Agendamento>({ "data": data, "dungeon.apelidoCurandeira": apelidoCurandeira }).toArray()
    }
}
