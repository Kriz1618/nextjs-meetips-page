import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { method, body } = req;

  if (method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://kriz:ZskBNoTtk6k1fniB@cluster0.dabc7.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(body);

    console.log("12 result", result);

    client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
};

export default handler;
