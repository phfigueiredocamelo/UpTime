import { MongoClient } from "mongodb";
import { Guerreiro } from "../../domain/types";
import { DBConnection } from "../DBConnection";

export class GuerreirosRepo {
    private REPOSITORY_NAME = "guerreiros"

    async criar(guerreiro: Guerreiro): Promise<Guerreiro> {
        const conn = await DBConnection.connect()
        await conn.db("uptimes").collection(this.REPOSITORY_NAME).insertOne(guerreiro)
        return guerreiro
    }
}
