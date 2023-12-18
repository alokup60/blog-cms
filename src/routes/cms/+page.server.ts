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
let dbConn = await connectToCluster();
const db = dbConn.db("newBlogDb");
console.log("dataBase Created");
const collection = db.collection("blog");

// fatchData();

// Function to retrieve data from the MongoDB collection
// async function getDataFromCollection() {
//   const data = await collection.find({}).toArray();
//   console.log(data);

//   await dbConn.close();

//   return data;
// }

export const actions = {
  // Action to fetch data from the MongoDB collection
  // fetchData: async () => {
  //   try {
  //     const data = await getDataFromCollection();
  //     return { success: true, data };
  //   } catch (error) {
  //     console.error("Error fetching data from MongoDB:", error);
  //     return { success: false, error: "Internal Server Error" };
  //   }
  // },
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const selected = formData.get("file");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    // console.log(file.name);
    // const selected = formData.file;
    // const title = formData.title;
    // const desc = formData.desc;
    // const auth = formData.auth;
    // const content = formData.content;
    // const tags = formData.t

    // console.log(tags);

    // const file = formData.get("file");

    // const filePath = `./files/${fileName}`;
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
    let blogData = await collection.find().toArray();
    // let x = JSON.stringify(blogData);

    return { success: true };
  },
};

// export const actions = {
//   default: async ({ request }) => {
//
//
//     console.log(selected);
//     // if (
//     //   !(formData.fileToUpload as File).name ||
//     //   (formData.fileToUpload as File).name === "undefined"
//     // ) {
//     //   return fail(400, {
//     //     error: true,
//     //     message: "You must provide a file to upload",
//     //   });
//     // }

//     // const { fileToUpload } = formData as { fileToUpload: File };

//     return {
//       success: true,
//     };
//   },
// };
