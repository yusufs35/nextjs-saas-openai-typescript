import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri)
	throw new Error(
		"Please define MONGODB_URI environment variable inside env.local file"
	);

if (!dbName)
	throw new Error(
		"Please define MONGO_DB environment variable inside env.local file"
	);

export const connectToDB = async () => {
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = await MongoClient.connect(uri);
	const db = client.db(dbName);

	cachedClient = client;
	cachedDb = db;

	return { client, db };
};
