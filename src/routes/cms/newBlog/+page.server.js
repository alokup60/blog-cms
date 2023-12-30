import { writeFile, writeFileSync } from "fs";
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

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}
//DB created & collection created
let dbConn = await connectToCluster();
const db = dbConn.db("newBlogDb");
console.log("dataBase Created");
const collection = db.collection("blog");
const tagColl = db.collection("tagColl");
export const load = async () => {
  let tags = await tagColl.findOne({ name: "Anshu" });
  let tagData = JSON.stringify(tags.newdata);
  return {
    tagData,
  };
};

//set into DB formData
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("fileUpload");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    // const
    // const tagData = formData.getAll("tagData");
    console.log(file);

    //for storing file in local storage
    writeFileSync(
      `static/upload/${file.name}`,
      Buffer.from(await file.arrayBuffer())
    );
    //Save Db
    await collection.insertOne({
      title: title,
      desc: desc,
      auth: auth,
      content: content,
      tags: tags,
    });

    return { success: true };
  },
};
