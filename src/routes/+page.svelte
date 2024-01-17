<script>
  import BlogCard from "./components/BlogCard.svelte";

  export let data;

  let allData = JSON.parse(data.header);
  console.log(allData);
</script>

<BlogCard data={allData} />
