import { faqColl, tagColl } from "$lib/db/database";
import { Binary } from "mongodb";

export async function load() {
  let faqData = await faqColl.find().toArray();
  let tags = await tagColl.findOne({ name: "Anshu" });
  let tagData = JSON.stringify(tags.newdata);

  if (faqData) {
    const promises = faqData.map((elem) => {
      const question = elem.question;
      const bsonData = elem.answer.answer;
      const tags = elem.tags;
      const answer = bsonData ? bsonData.buffer.toString() : ""; //converter
      return { question, answer, tags };
    });
    const htmldata = await Promise.all(promises);
    return {
      htmldata,
      tagData,
    };
  }
}

export const actions = {
  default: async ({ request }) => {
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
        "Conetnt-type": "application/json",
      },
    };
  },
};
