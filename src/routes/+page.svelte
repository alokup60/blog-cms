<script>
  import BlogCard from "./components/BlogCard.svelte";

  export let data;

  let allData = JSON.parse(data.header);
  // console.log(allData, "main-header");
</script>

<BlogCard data={allData} />
