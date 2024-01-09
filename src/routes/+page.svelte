<script>
  import { blogForm } from "$lib/store/stores.js";
  import Header from "./Header.svelte";
  import BlogCard from "./components/BlogCard.svelte";

  export let data;
  console.log(data.body);
  // console.log(data.htmldata, "hi");
  // let content = JSON.parse(data.htmldata);

  let allData = JSON.parse(data.header);
  // console.log(allData);

  $: {
    $blogForm = allData;
  }
</script>

<section class="w-11/12 flex mx-auto">
  <BlogCard />
</section>
