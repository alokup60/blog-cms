import { blog } from "$lib/db/database";

export const load = async () => {
  let blogDataCursor = await blog.find().toArray();
  let data = await blog.find().toArray();
  let publish = await data.filter((elem) => elem.publish_confirmation === "on");
  let allData = JSON.stringify(publish);

  if (blogDataCursor) {
    const promises = blogDataCursor.map((elem) => {
      const bsonData = elem.content.content;
      const content = bsonData ? bsonData.buffer.toString() : "";
      return content;
    });
    const htmldata = await Promise.all(promises);
    return {
      status: 200,
      header: allData,
      body: JSON.stringify(htmldata),
    };
  }
};
