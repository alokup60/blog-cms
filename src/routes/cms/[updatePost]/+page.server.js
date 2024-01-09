import { blog, tagColl } from "$lib/db/database";
import { Binary } from "mongodb";
import { page } from "$app/stores";
import { imagekit } from "$lib/imagekit/imagekit.js";
import { ObjectId } from "mongodb";

let postId;

export const load = async ({ params }) => {
  const updatePost = params.updatePost;
  postId = new ObjectId(updatePost);
  try {
    let data = await blog.find({ _id: postId }).toArray();
    let newdata = JSON.stringify(data);
    let tagData = await tagColl.find().toArray();
    let alltags = JSON.stringify(tagData);
    if (data) {
      const promises = data.map((elem) => {
        const bsonData = elem.content.content;
        const content = bsonData ? bsonData.buffer.toString() : "";
        return content;
      });
      const htmldata = await Promise.all(promises);
      return {
        status: 200,
        body: JSON.stringify(htmldata),
        newdata,
        alltags,
      };
    }

    // console.log(post, "from server");
    // if (data) {
    //   // const promises = data.map((elem) => {
    //   const bsonData = data.content.content;
    //   // console.log(bsonData);
    //   const content = bsonData ? bsonData.buffer.toString() : "";
    //   let newcontent = JSON.parse(content);
    //   // console.log(newcontent);
    //   // return content;
    //   // });
    // const htmldata = await Promise.all(promises);
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
};

export const actions = {
  updatePost: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("fileUpload");
    // const authImg = formData.get("authorUpload");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    const dt = formData.getAll("dt");
    // const tagData = formData.getAll("tagData");
    console.log(title, desc, auth, content, tags, dt);

    //cover image
    let URL;

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

    //author image
    // let authImgURL;
    // await imagekit
    //   .upload({
    //     file: Buffer.from(await authImg.arrayBuffer()), //required
    //     fileName: authImg.name, //required
    //     // folder: "/newblog",
    //     extensions: [
    //       {
    //         name: "google-auto-tagging",
    //         maxTags: 5,
    //         minConfidence: 95,
    //       },
    //     ],
    //   })
    //   .then((response) => {
    //     authImgURL = response.url;
    //     console.log(response.url);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const newData = {
      content: new Binary(Buffer.from(content)),
    };
    console.log(newData, "converted");

    //Save Db
    await blog.updateOne(
      { _id: postId },
      {
        $set: {
          title: title,
          desc: desc,
          auth: auth,
          dt: dt,
          content: newData,
          tags: tags,
          img: await URL,
        },
      }
    );

    return { success: true };
  },
};
