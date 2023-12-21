import { writeFile, writeFileSync } from "fs";
import { MongoClient } from "mongodb";
// import { tags } from "../cms/+page.svelte";

let tags = {};
export const load = () => {
  return {
    tags,
  };
};
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
// console.log(JSON.stringify($formtest), "server");
let dbConn = await connectToCluster();
const db = dbConn.db("newBlogDb");
console.log("dataBase Created");
const collection = db.collection("blog");
const tagColl = db.collection("tagColl");

export const actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const selected = formData.get("file");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    const tagData = formData.getAll("tagData");
    console.log(tagData, "hasdyasda");

    //for storing file in local storage
    writeFileSync(
      `static/upload/${selected.name}`,
      Buffer.from(await selected.arrayBuffer())
    );
    await collection.insertOne({
      title: title,
      desc: desc,
      auth: auth,
      file: selected,
      content: content,
      tags: tags,
    });
    let user = await tagColl.updateOne(
      { name: "Anshu" },
      // { _id: new Object("6582ee66092b407f13d89449") },
      { $push: { newdata: tagData } }
      // { _id: Object("62caa34849e3d70aa618d9f2") },
      // { $set: { xyz: { a: "yweyfwewe" } } }
    );
    // let user = await tagColl.updateOne(
    //   {"_id": new Object('6582bf90092b407f13d89400')},
    //   $set:{
    //     tags: {}
    //   }

    // );
    if (user) {
      console.log("ho gya kaam");
    }
    //get Data
    let blogData = await collection.find({}).toArray();
    let x = JSON.stringify(blogData);

    return { x, success: true };
  },
};
