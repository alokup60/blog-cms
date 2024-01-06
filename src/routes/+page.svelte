<script>
  import { blogForm } from "$lib/store/stores.js";
  import Header from "./Header.svelte";
  import BlogCard from "./components/BlogCard.svelte";

  export let data;

  let allData = JSON.parse(data.allData);

  $: {
    $blogForm = allData;
  }
</script>

<section class="w-11/12 flex mx-auto">
  <BlogCard />
</section>
