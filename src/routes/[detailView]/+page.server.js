import { blog } from "$lib/db/database.js";
export const prerender = true;
export async function load({ params }) {
  let blogTitle = params.detailView.replace(/-/g, " "); // using title we use crux for view just lyk using id
  let blogPost = await blog.find({ title: blogTitle }).toArray();
  let allPost = await blog.find().toArray();

  let newdata = JSON.stringify(blogPost);
  if (blogPost) {
    const promises = blogPost.map((elem) => {
      const bsonData = elem.content.content;
      const content = bsonData ? bsonData.buffer.toString() : "";
      return content;
    });
    const htmldata = await Promise.all(promises);
    return {
      status: 200,
      body: JSON.stringify(htmldata),
      allPost: JSON.stringify(allPost),
      newdata,
    };
  }
}
