import { blog, tagColl } from "$lib/db/database.js";
import { Binary } from "mongodb";
import { imagekit } from "$lib/imagekit/imagekit.js";

//find the tagColl
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
    const seo_title = formData.get("title_seo");
    const desc_seo = formData.get("desc_seo");
    const author_seo = formData.get("author_seo");
    const location_seo = formData.get("location_seo");
    const keywords_seo = formData.get("keywords_seo");
    const publish_confirmation = formData.get("publish_confirmation");

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
      dt: date,
      content: newData,
      tags: tags,
      mobImg: await mobURL,
      img: await URL,
      authImg: await authURL,
      seo_title,
      desc_seo,
      author_seo,
      location_seo,
      keywords_seo,
      publish_confirmation,
    });

    return { success: true };
  },
};
