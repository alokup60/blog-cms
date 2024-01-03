<script>
  // import { blogForm } from "$lib/store/stores.js";
  export let data;
  let post = JSON.parse(data.newdata);
  console.log(post);
</script>

<section class="bg-[#FBF9F4]">
  <!-- {#if $blogForm}
    {#each $blogForm as data}
      {data.title}
    {/each}
  {/if} -->
  <!-- {#each data.newdata as item}
{data.} -->

  <p>Back to Guides</p>

  <!-- <h2 class="font-bold text-[48px]">
    7 tips for researching and buying your first investment property
  </h2> -->
  {#each post as data}
    <h2 class="font-bold text-[48px]">
      {data.title}
    </h2>
    <p>
      {data.content}
    </p>
    <div>
      <img src={data.img} alt="" />
    </div>
    <div>
      <p>{data.auth}</p>
    </div>
  {/each}
</section>
