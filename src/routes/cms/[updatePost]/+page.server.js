import { blog, tagColl, authorColl } from "$lib/db/database";
import { Binary } from "mongodb";
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
    let author = await authorColl.find().toArray();
    let authorData = JSON.stringify(author);
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
        authorData,
      };
    }
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
};

export const actions = {
  updatePost: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("fileUpload");
    const altForWebPrev = formData.get("altForWebPrev");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const authN = formData.get("authName");
    const authIm = formData.get("authImg");
    const authAl = formData.get("authAlt");
    const content = formData.get("content");
    const tags = formData.getAll("tags");
    const dt = formData.getAll("dt");
    const updatedDt = formData.getAll("updatedDt");
    const seo_title = formData.get("title_seo");
    const desc_seo = formData.get("desc_seo");
    const author_seo = formData.get("author_seo");
    const location_seo = formData.get("location_seo");
    const keywords_seo = formData.get("keywords_seo");
    const publish_confirmation = formData.get("publish_confirmation");
    // const tagData = formData.getAll("tagData");
    // console.log(title, desc, auth, content, tags, dt);
    console.log(dt);

    let authName = authN;
    let authImg = authIm;
    let authAlt = authAl;

    if (authName == null && authImg == null && authAlt == null) {
      let authorData = await authorColl.find().toArray();
      // let author = JSON.stringify(authorData);
      authorData.map((item) => {
        authName = item.authName;
        authAlt = item.authAl;
        authImg = item.authImg;
      });
    }

    //cover image
    let URL;

    await imagekit
      .upload({
        file: Buffer.from(await file.arrayBuffer()), //required
        fileName: file.name, //required
        // folder: "/newblog",
      })
      .then((response) => {
        URL = response.url;
        // console.log(response.url);
      })
      .catch((error) => {
        console.log(error);
      });

    const newData = {
      content: new Binary(Buffer.from(content)),
    };

    //Save Db
    await blog.updateOne(
      { _id: postId },
      {
        $set: {
          title: title,
          desc: desc,
          authName,
          authAlt,
          authImg,
          dt: dt,
          updatedDt,
          content: newData,
          tags: tags,
          img: await URL,
          altForWebPrev,
          seo_title,
          desc_seo,
          author_seo,
          location_seo,
          keywords_seo,
          publish_confirmation,
        },
      }
    );

    return { success: true };
  },
};
