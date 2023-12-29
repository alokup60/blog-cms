import { blog, tagColl } from "$lib/db/database";
import { page } from "$app/stores";
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
    // const selected = formData.get("file");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const auth = formData.get("auth");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    // const tagData = formData.getAll("tagData");
    console.log(title, desc, auth, content, tags);

    //Save Db
    await blog.updateOne(
      { _id: postId },
      {
        $set: {
          title: title,
          desc: desc,
          auth: auth,
          content: content,
          tags: tags,
        },
      }
    );

    return { success: true };
  },
};
