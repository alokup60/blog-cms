// import { MongoClient } from "mongodb";
// let name = "Anshul Singh";
// async function connectToCluster() {
//   let mongoClient;
//   try {
//     mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
//     console.log("Connecting to MongoDB Compass...");
//     await mongoClient.connect();
//     console.log("Successfully connected to MongoDB Compass!");
//     // const db = mongoClient.db("newBlogDb"); //for creating DB
//     console.log("Databse created successfully.");

//     return mongoClient;
//   } catch (error) {
//     console.error("Connection to MongoDB Atlas failed!", error);
//     process.exit();
//   }
// }

// let dbConn = await connectToCluster();
// const db = dbConn.db("newBlogDb");
// console.log("dataBase Created");
// const testColl = db.collection("testColl");
// testColl.insertOne({ name });
// let test = await testColl.find();
// // console.log(test);

// export const actions = {
//   default: async ({ request }) => {
//     try {
//       const formData = await request.formData();
//       const htmlContent = formData.get("htmlContent");

//       await testColl.insertOne({ htmlContent });

//       return {
//         status: 200,
//         body: JSON.stringify({ success: true }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//     } catch (error) {
//       console.error("Error:", error);
//       return {
//         status: 500,
//         body: { message: "Internal Server Error" },
//       };
//     }
//   },
// };

import { testColl } from "$lib/db/database.js";
import { Binary } from "mongodb";
export async function load() {
  let testData = await testColl.find().toArray();
  // console.log(testData);
  if (testData) {
    // Use map instead of forEach to create an array of promises
    const promises = testData.map(async (element) => {
      // const bsonData = element.newdata.testData;
      console.log(element);
      // const newtestdata = bsonData ? bsonData.buffer.toString() : "";
      // console.log(newtestdata);
      // return newtestdata;
    });
    // Use Promise.all to wait for all promises to resolve
    const htmldata = await Promise.all(promises);
    // console.log(htmldata);
    // Return or send the response here
    return {
      htmldata,
    };
  }
}
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const testData = data.get("content");
    const newdata = {
      testData: new Binary(Buffer.from(testData)),
    };
    let user = testColl.insertOne({ content: testData });
    if (!user) {
      return { success: false };
    } else {
      return {
        body: JSON.stringify({ success: true }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  },
};
