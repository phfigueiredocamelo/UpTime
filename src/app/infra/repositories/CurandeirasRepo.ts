import { Curandeira } from "../../domain/types"
import { DBConnection } from "../DBConnection"


export class CurandeirasRepo {
    private REPOSITORY_NAME = "curandeiras"

    async criar(curandeira: Curandeira): Promise<Curandeira> {
        const conn = await DBConnection.connect()
        await conn.db("uptimes").collection(this.REPOSITORY_NAME).insertOne(curandeira)
        return curandeira
    }

    async procurarPeloApelido(apelido: string): Promise<Curandeira> {
        const conn = await DBConnection.connect()
        return (await conn.db("uptimes").collection(this.REPOSITORY_NAME).findOne<Curandeira>({ "apelido": apelido })) as Curandeira
    }
}
