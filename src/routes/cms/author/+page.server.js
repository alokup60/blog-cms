import { authorColl } from "$lib/db/database";
import { imagekit } from "$lib/imagekit/imagekit.js";
import { ObjectId } from "mongodb";

export const load = async () => {
  let author = await authorColl.find().toArray();
  // console.log(author);
  let allData = JSON.stringify(author);
  return {
    allData,
  };
};

export const actions = {
  addAuth: async ({ request }) => {
    const formData = await request.formData();
    const authName = formData.get("authName");
    const authImg = formData.get("authImg");
    const authAlt = formData.get("authAlt");
    // console.log(authImg);

    let authURL;
    // author image
    await imagekit
      .upload({
        file: Buffer.from(await authImg.arrayBuffer()),
        fileName: authImg.name,
      })
      .then((response) => {
        authURL = response.url;
        console.log(response.url);
      })
      .catch((error) => {
        console.log(error);
      });

    let user = await authorColl.insertOne({
      authName,
      authAlt,
      authImg: await authURL,
    });
    return { success: true };
  },
  removeAuth: async ({ request }) => {
    const formData = await request.formData();
    const dataId = formData.get("dataId");
    let authId = new ObjectId(dataId);
    console.log(authId);
    const deletedAuth = await authorColl.deleteOne({ _id: authId });
    console.log(deletedAuth);
    return { success: true };
  },
};
