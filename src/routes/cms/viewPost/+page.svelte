<script>
  import { blogForm } from "$lib/store/stores.js";
  import ViewPost from "../../components/ViewPost.svelte";
  export let data;
  let allData = JSON.parse(data.allData);
  // console.log(allData);
  $: {
    $blogForm = allData;
  }
</script>

<section class="flex ml-[4rem]">
  <!-- <h2 class="text-center text-2xl font-bold">This is View Page</h2> -->
  <ViewPost data={allData} />
</section>
