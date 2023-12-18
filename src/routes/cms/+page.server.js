import { MongoClient } from "mongodb";
async function connectToCluster() {
  let mongoClient;

  try {
    mongoClient = new MongoClient("mongodb://127.0.0.1:27017/BlogDb");
    console.log("Connecting to MongoDB Compass...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Compass!");
    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}
export const actions = {
  cms: async ({ cookies, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const desc = data.get("desc");
    const auth = data.get("auth");
    const content = data.get("content");
    const file = data.get("file");
    console.log(data);
    connectToCluster();

    return { success: true };
  },
};
