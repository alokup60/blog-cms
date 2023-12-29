import { MongoClient, ObjectId } from "mongodb";

//1-> connect to DB
async function connectToCluster() {
  let mongoClient;
  try {
    mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
    console.log("Connecting to MongoDB Compass...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Compass!");
    const db = mongoClient.db("newBlogDb"); //for creating DB
    console.log("connected to the DB.");
    const blog = db.collection("blog");

    return { mongoClient, blog };
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}
//2-> initiate into variable
const { mongoClient, blog } = await connectToCluster();

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
    // console.log(typeof removePostId);
    // console.log("tapped");

    const deletedPost = await blog.deleteOne({ id: postId });

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
