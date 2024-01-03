import { blog } from "$lib/db/database.js";
export const prerender = true;
export async function load({ params }) {
  let blogTitle = params.detailView.replace(/-/g, " "); // using title we use crux for view just lyk using id
  let blogPost = await blog.find({ title: blogTitle }).toArray();
  let newdata = JSON.stringify(blogPost);
  return { newdata };
  //   console.log(title.replace("-", " "));
}
