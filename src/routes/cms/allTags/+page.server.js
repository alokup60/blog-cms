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

let dbConn = await connectToCluster();
const db = dbConn.db("newBlogDb");
console.log("Database connected");
const tagColl = db.collection("tagColl");
export const load = async () => {
  let tags = await tagColl.findOne({ name: "Anshu" });
  let tagData = JSON.stringify(tags.newdata);
  return {
    tagData,
  };
};

//add
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const newTags = formData.get("newTag");
    console.log(newTags);

    let user = await tagColl.updateOne(
      {
        name: "Anshu",
      },
      { $push: { newdata: newTags } }
    );
    return { success: true };
  },
};
