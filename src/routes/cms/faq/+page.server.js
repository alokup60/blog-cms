import { faqColl, tagColl } from "$lib/db/database";
import { Binary, ObjectId } from "mongodb";

export async function load() {
  let faqData = await faqColl.find().toArray();
  let tags = await tagColl.findOne({ name: "Anshu" });
  let tagData = JSON.stringify(tags.newdata);

  if (faqData) {
    const promises = faqData.map((elem) => {
      const id = elem._id;
      const question = elem.question;
      const bsonData = elem.answer.answer;
      const tags = elem.tags;
      const answer = bsonData ? bsonData.buffer.toString() : ""; //converter
      return { question, answer, tags, id };
    });
    const htmldata = await Promise.all(promises);
    return {
      htmldata: JSON.stringify(htmldata),
      tagData,
    };
  }
}

// export const actions = {
//   createdFaq: async ({ request }) => {
//     const formData = await request.formData();
//     const question = formData.get("question");
//     const answer = formData.get("answer");
//     const tags = formData.getAll("tags");

//     const newAnswer = {
//       answer: new Binary(Buffer.from(answer)),
//     };

//     await faqColl.insertOne({
//       question: question,
//       answer: newAnswer,
//       tags: tags,
//     });

//     return {
//       body: JSON.stringify({ success: true }),
//       headers: {
//         "Conetnt-type": "application/json",
//       },
//     };
//   },

//   deleteFaq: async ({ request }) => {
//     const faqData = await request.formData();
//     const removeFaqId = faqData.get("faqId");
//     const faqId = new ObjectId(removeFaqId);

//     try {
//       const deletedFaq = await faqColl.deleteOne({ _id: faqId });
//       console.log("Post deleted successfully:", deletedFaq);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       return { success: false, error: "Error deleting post" };
//     }

//     return { success: true };
//   },
// };

export const actions = {
  createdFaq: async ({ request }) => {
    const formData = await request.formData();
    const question = formData.get("question");
    const answer = formData.get("answer");
    const tags = formData.getAll("tags");

    const newAnswer = {
      answer: new Binary(Buffer.from(answer)),
    };

    //insert into DB
    await faqColl.insertOne({
      question: question,
      answer: newAnswer,
      tags: tags,
    });

    return {
      body: JSON.stringify({ success: true }),
      headers: {
        "Content-Type": "application/json", // Fix the typo here
      },
    };
  },

  deleteFaq: async ({ request }) => {
    const faqData = await request.formData();
    const removeFaqId = faqData.get("faqId");
    console.log(removeFaqId);
    const faqId = new ObjectId(removeFaqId);
    console.log(faqId);
    try {
      const deletedFaq = await faqColl.deleteOne({ _id: faqId });
      console.log("Post deleted successfully:", deletedFaq);
    } catch (error) {
      console.error("Error deleting post:", error);
      return { success: false, error: "Error deleting post" };
    }

    return { success: true };
  },
};
