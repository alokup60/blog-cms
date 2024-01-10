import { blog } from "$lib/db/database";

export const load = async () => {
  let data = await blog.find().toArray();
  let allData = JSON.stringify(data);

  return {
    status: 200,
    header: allData,
  };
};
