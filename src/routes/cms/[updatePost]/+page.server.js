import { blog, tagColl } from "$lib/db/database";
import { page } from "$app/stores";
import { imagekit } from "$lib/imagekit/imagekit.js";
import { ObjectId } from "mongodb";
let postId;

export const load = async ({ params }) => {
  const updatePost = params.updatePost;
  postId = new ObjectId(updatePost);
  try {
    let data = await blog.find({ _id: postId }).toArray();
    let tagData = await tagColl.find().toArray();
    let post = JSON.stringify(data);
    let alltags = JSON.stringify(tagData);

    return {
      post,
      alltags,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
};

export const actions = {
  updatePost: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("fileUpload");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    const dt = formData.getAll("dt");
    // const tagData = formData.getAll("tagData");
    console.log(title, desc, auth, content, tags, dt);

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

    //Save Db
    await blog.updateOne(
      { _id: postId },
      {
        $set: {
          title: title,
          desc: desc,
          auth: auth,
          dt: dt,
          content: content,
          tags: tags,
          img: await URL,
        },
      }
    );

    return { success: true };
  },
};
