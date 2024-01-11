import { blog } from "$lib/db/database";

// 3-> load function to find
export const load = async () => {
  let blogDataCursor = await blog.find().toArray();
  let data = await blog.find().toArray();
  let allData = JSON.stringify(data);
  if (blogDataCursor) {
    const promises = blogDataCursor.map((elem) => {
      const bsonData = elem.content.content;
      const content = bsonData ? bsonData.buffer.toString() : "";
      return content;
    });
    const htmldata = await Promise.all(promises);
    // console.log(htmldata, "hiiiii");
    return {
      status: 200,
      header: allData,
      body: JSON.stringify(htmldata),
    };
  }

  // If there's no blogDataCursor, you can return an empty array or handle it as needed.
  // return {
  //   htmldata: [],
  //   allData: null,
  // };
};
