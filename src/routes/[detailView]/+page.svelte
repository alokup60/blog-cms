<script>
  import { goto } from "$app/navigation";

  export let data;
  let post = JSON.parse(data.newdata);
  // console.log(post);

  let content = post.map((item) => {
    // console.log(item.content, "content");
    return item.content;
  });

  $: wordCount = content.join(" ").split(" ").length;
  $: estimatedReadingTimeInMinutes = Math.floor(wordCount / 238);
  $: estimatedReadingTimeInSeconds = Math.round((wordCount / 238) * 60) % 60;
  // const prev = () => {
  //   goto(/)
  // };
</script>

<section class="bg-[#FBF9F4] w-full">
  <div class="flex w-8/12 justify-center mx-auto flex-col mt-4 gap-4 flex-wrap">
    <div class="flex items-center justify-center gap-2">
      <button type="button" on:click={prev}
        ><svg
          class="opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
          ><path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          /></svg
        >
      </button>

      <p class="text-center opacity-80">Back to Guides</p>
    </div>

    {#each post as data}
      <h2 class="font-bold text-4xl text-center">
        {data.title}
      </h2>
      <p class="text-center tracking-wide text-xl">
        {data.desc}
      </p>
      <p class="text-center opacity-80">
        {#if !estimatedReadingTimeInMinutes}
          <p>Estimated Reading Time: Less than a minute</p>
        {:else}
          {` Estimated Reading Time:
        ${estimatedReadingTimeInMinutes}
        minutes
        ${estimatedReadingTimeInSeconds}
        seconds`}
        {/if}
      </p>
      <div class="mt-[2rem]">
        <img src={data.img} alt="" class="rounded-xl" />
      </div>
    {/each}
  </div>
  <div
    class="w-11/12 flex justify-between mx-auto flex-wrap mt-[4rem] items-start"
  >
    <!-- content -->
    <div class="w-8/12">
      {#each post as data}
        <div class="tracking-wider">
          {@html data.content}
        </div>
      {/each}
    </div>
    <!-- link  -->
    <div class="w-3/12 flex flex-col gap-2">
      {#each post as data}
        <div>
          <img src={data.authImg} alt="" class="rounded-full w-20 h-20" />
        </div>
        <div>
          <h2 class="font-semibold">By {data.auth}</h2>
        </div>
      {/each}
    </div>
  </div>
</section>
