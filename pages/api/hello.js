// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { clientPromise } from "../../utils/mongodbConnector";

export default async function handler(req, res) {
	let client = await clientPromise;
	let db = await client.db("test");
	let collection = await db.collection("users");

	let users = await collection.find({}).toArray();

	res.status(200).json({ name: "John Doe", users: users });
}
