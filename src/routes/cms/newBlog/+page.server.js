import { writeFile, writeFileSync } from "fs";
import { blog, tagColl } from "$lib/db/database.js";
import { Binary, MongoClient } from "mongodb";
import { imagekit } from "$lib/imagekit/imagekit.js";
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

export const load = async () => {
  let tags = await tagColl.findOne({ name: "Anshu" });
  let tagData = JSON.stringify(tags.newdata);
  console.log(tagData);
  return {
    tagData,
  };
};

//set into DB formData
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("fileUpload");
    const mobileImg = formData.get("mobileUpload");
    const authImg = formData.get("authorUpload");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    const tagData = formData.getAll("tagData");
    const date = formData.getAll("dt");
    const updatedDt = formData.getAll("updatedDt");

    function formatDate(date) {
      let dt = new Date(date[0]);
      let day = dt.getDate();
      let monthName = dt.toLocaleString("default", { month: "long" });
      let year = dt.getFullYear();
      let formattedDay = day < 10 ? "0" + day : day;
      return `${monthName} ${formattedDay}, ${year}`;
    }
    let postedDate = formatDate(date);
    // let updatedDate = formatDate(updatedDt);
    console.log(formatDate(date), "currentDate");
    // console.log(formatDate(updatedDt), "updated date");
    // const updatedDt = new Date(date[0]);
    // let day = updatedDt.getDate();
    // let formattedDay = day < 10 ? "0" + day : day;
    // let monthName = updatedDt.toLocaleString("default", { month: "long" });
    // let year = updatedDt.getFullYear();
    // let updatedDate = `${monthName} ${formattedDay}, ${year}`;

    // console.log(file);
    // console.log(content);

    // Using Promises
    let URL;
    let mobURL;
    let authURL;
    //web image
    await imagekit
      .upload({
        file: Buffer.from(await file.arrayBuffer()), //required
        fileName: file.name, //required
        // folder: "/newblog",
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then((response) => {
        URL = response.url;
        console.log(response.url);
      })
      .catch((error) => {
        console.log(error);
      });

    // mobile image
    await imagekit
      .upload({
        file: Buffer.from(await mobileImg.arrayBuffer()),
        fileName: file.name,
        // folder: "/newblog",
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then((response) => {
        mobURL = response.url;
        console.log(response.url);
      })
      .catch((error) => {
        console.log(error);
      });

    // author image
    await imagekit
      .upload({
        file: Buffer.from(await authImg.arrayBuffer()),
        fileName: file.name,
        // folder: "/newblog",
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then((response) => {
        authURL = response.url;
        console.log(response.url);
      })
      .catch((error) => {
        console.log(error);
      });

    const newData = {
      content: new Binary(Buffer.from(content)),
    };
    console.log(newData, "converted");

    //Save Db
    await blog.insertOne({
      title: title,
      desc: desc,
      auth: auth,
      dt: postedDate,
      // updatedDt: null,
      content: newData,
      tags: tags,
      mobImg: await mobURL,
      img: await URL,
      authImg: await authURL,
    });

    return {
      body: JSON.stringify({ success: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
};
