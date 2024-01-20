import { MongoClient, ObjectId } from "mongodb";
import { blog } from "$lib/db/database.js";

//3-> load function to find
export const load = async () => {
  try {
    let data = await blog.find().toArray();
    let allData = JSON.stringify(data);

    return {
      allData,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
};

export const actions = {
  deletePost: async ({ request }) => {
    const blogData = await request.formData();
    const removePostId = blogData.get("postId");
    const postId = new ObjectId(removePostId);

    try {
      const deletedPost = await blog.deleteOne({ _id: postId });
      console.log("Post deleted successfully:", deletedPost);
    } catch (error) {
      console.error("Error deleting post:", error);
      return { success: false, error: "Error deleting post" };
    }

    return { success: true };
  },
};
