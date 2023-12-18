import { MongoClient } from "mongodb";
async function connectToCluster() {
  let mongoClient;

  try {
    mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
    console.log("Connecting to MongoDB Compass...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Compass!");
    // const db = mongoClient.db("newBlogDb"); //for creating DB
    console.log("Databse created successfully.");
    // let db = mongoClient.db("blogDb");//database creation
    // let coll = db.collections("jgsd");//collection creation

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}
let dbConn = await connectToCluster();
const db = dbConn.db("newBlogDb");
console.log("dataBase Created");
const collection = db.collection("blog");

export const actions = {
  cms: async ({ cookies, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const desc = data.get("desc");
    const auth = data.get("auth");
    const content = data.get("content");
    const tags = data.get("tags");
    const file = data.get("file");
    await collection.insertOne({
      title: title,
      desc: desc,
      auth: auth,
      content: content,
      tags: tags,
    });
    console.log(data);

    // let x = content.replace(/(<([^>]+)>)/gi, "");

    return { success: true };
  },
};
