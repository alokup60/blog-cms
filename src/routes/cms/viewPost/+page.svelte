<script>
  import { blogForm } from "$lib/store/stores.js";
  import ViewPost from "../../components/ViewPost.svelte";
  export let data;
  let allData = JSON.parse(data.allData);
  $: {
    $blogForm = allData;
  }
</script>

<section class="lg:ml-72 mx-auto">
  <!-- <h2 class="text-center text-2xl font-bold">This is View Page</h2> -->
  <ViewPost />
</section>
