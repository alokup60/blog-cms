<script>
  import BlogCard from "./components/BlogCard.svelte";
  import { blogData } from "$lib/store/stores";

  export let data;
  // console.log(data.body);

  let allData = JSON.parse(data.header);
  // console.log(allData);

  $: {
    $blogData = allData;
  }
  // $: {
  //   console.log($blogData);
  // }
  // console.log(allData);
</script>

<section class="w-11/12 flex mx-auto">
  <BlogCard data={allData} />
</section>
