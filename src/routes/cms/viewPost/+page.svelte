<script>
  import ViewPost from "../../components/ViewPost.svelte";
  export let data;
  let allData = JSON.parse(data.allData);
</script>

<section class="flex ml-[4rem]">
  <ViewPost data={allData} />
</section>
