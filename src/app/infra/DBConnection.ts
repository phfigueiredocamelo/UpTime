
import { MongoClient } from "mongodb"


export const DBConnection = new MongoClient(
    process.env.MONGO_URI ? process.env.MONGO_URI : "mongodb://mongodb:27017",
    process.env.MONGO_URI ? {} : {"auth": {"username": "root", "password": "example"}
})
