import { MongoClient } from "mongodb";

//1-> connect to DB
async function connectToCluster() {
  let mongoClient;
  try {
    mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
    console.log("Connecting to MongoDB Compass...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Compass!");
    // const db = mongoClient.db("newBlogDb"); //for creating DB
    console.log("connected to the DB.");
    // const blog = db.collection("blog");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}
let mongoClient = await connectToCluster();
export const blogDB = mongoClient.db("newBlogDb");
export const blog = blogDB.collection("blog");
export const tagColl = blogDB.collection("tagColl");
export const testColl = blogDB.collection("testColl");
