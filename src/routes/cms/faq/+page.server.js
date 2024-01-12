import { faqColl } from "$lib/db/database";
import { Binary } from "mongodb";

export async function load({ params }) {
  let faqData = await faqColl.find({}).toArray();
  let newFaq = JSON.stringify(faqData);

  if (faqData) {
    const promises = faqData.map((elem) => {
      const bsonData = elem.answer.answer;
      const answer = bsonData ? bsonData.buffer.toString() : "";
      return answer;
    });
    const htmldata = await Promise.all(promises);
    return {
      status: 200,
      body: JSON.stringify(htmldata),
      newFaq,
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
    console.log(newAnswer, "converted into Binary(BSON)");

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
