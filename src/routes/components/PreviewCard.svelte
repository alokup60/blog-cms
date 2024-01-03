<script>
  import { blogForm } from "$lib/store/stores.js";
  $: {
    console.log($blogForm);
  }
</script>

<section>
  {#each $blogForm as data}
    {data.title}
  {/each}
</section>
