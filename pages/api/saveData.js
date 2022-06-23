import { clientPromise } from "../../utils/mongodbConnector";
export default async function handler(req, res) {
	let client = await clientPromise;
	let db = await client.db("test");
	let collection = await db.collection("scheduler");

	let insertResponse = await collection.insertOne(req.body.Obj);

	res.status(200).json({ message: "success", dbResponse: insertResponse });
}
