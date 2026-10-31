import { MongoClient, type Db } from "mongodb";

const uri =
  process.env.MONGODB_URL?.trim() || "mongodb://127.0.0.1:27017/studiospace";
const dbName = process.env.MONGODB_DB_NAME?.trim() || "studiospace";

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoUri: string | undefined;
}

if (!globalThis._mongoClient || globalThis._mongoUri !== uri) {
  globalThis._mongoClient = new MongoClient(uri);
  globalThis._mongoUri = uri;
}

export const client: MongoClient = globalThis._mongoClient;
export const db: Db = client.db(dbName);
