<script>
  import { blogForm } from "$lib/store/stores.js";
  import PreviewCard from "../../components/PreviewCard.svelte";

  export let form;

  let allData = JSON.parse(form.allData);

  $: {
    $blogForm = allData;
  }
</script>

<section>
  <PreviewCard />
</section>
