import { faqColl } from "$lib/db/database";
import { Binary } from "mongodb";

export async function load({ params }) {
  let faqData = await faqColl.find().toArray();

  if (faqData) {
    const promises = faqData.map((elem) => {
      const question = elem.question;
      const bsonData = elem.answer.answer;
      const answer = bsonData ? bsonData.buffer.toString() : "";
      return { question, answer };
    });
    const htmldata = await Promise.all(promises);
    return {
      htmldata,
    };
  }
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const question = formData.get("question");
    const answer = formData.get("answer");

    const newAnswer = {
      answer: new Binary(Buffer.from(answer)),
    };

    //insert into DB
    await faqColl.insertOne({
      question: question,
      answer: newAnswer,
    });

    return {
      body: JSON.stringify({ success: true }),
      headers: {
        "Conetnt-type": "application/json",
      },
    };
  },
};
