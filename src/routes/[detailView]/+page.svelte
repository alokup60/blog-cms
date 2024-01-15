<script>
  import { browser } from "$app/environment";
  import "../../app.css";
  import RelatedBlog from "../components/RelatedBlog.svelte";

  export let data;
  let post;
  $: post = JSON.parse(data.newdata); //single post

  let contentData;
  $: contentData = JSON.parse(data.body);
  let allpost;
  $: allpost = JSON.parse(data.allPost); //all post
  // console.log(allpost);

  let tag;
  $: {
    tag = post.map((item) => {
      // console.log(item.tags, "tag");
      return item.tags;
    });
  }

  let flattenedTags;
  $: flattenedTags = tag.flat();
  let relatedPosts;
  $: relatedPosts = allpost.filter(
    (elem) =>
      elem._id !== post[0]._id && // Exclude current post
      elem.tags &&
      elem.tags.some((tag) => flattenedTags.includes(tag))
  );

  let postedDate;
  $: {
    postedDate = post.map((item) => {
      const date = new Date(item.dt);
      let day = date.getDate();
      let formattedDay = day < 10 ? "0" + day : day;
      let monthName = date.toLocaleString("default", { month: "long" });
      let year = date.getFullYear();
      let currentDate = `${monthName} ${formattedDay}, ${year}`;
      return currentDate;
    });
  }

  $: wordCount = contentData.join(" ").split(" ").length;
  $: estimatedReadingTimeInMinutes = Math.floor(wordCount / 238);
  $: estimatedReadingTimeInSeconds = Math.round((wordCount / 238) * 60) % 60;

  //previous page
  function prev() {
    if (browser) {
      history.back();
    }
  }
</script>

<svelte:head>
  {#each post as item}
    <meta name="title" content={item.seo_title || item.title} />
    <meta name="description" content={item.desc_seo || item.desc} />
    <meta
      name="city"
      content={item.location_seo ||
        "New Delhi, Noida, Gurgaon, Pune, Banglore, Mumbai, Ghaziabad, Faridabad, Greater Noida, Gautam Buddha Nagar, Delhi NCR"}
    />
    <meta name="keywords" content={item.keywords_seo || item.tags} />
    <meta name="author" content="Finserve.club" />
  {/each}
</svelte:head>

<section class="bg-[#FBF9F4] w-full">
  <div class="flex w-8/12 justify-center mx-auto flex-col mt-4 gap-4 flex-wrap">
    <button
      type="button"
      on:click={prev}
      class="flex items-center justify-center gap-2 text-center opacity-80 hover:underline"
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
      Back to Guides
    </button>

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
      {#if postedDate}
        <p class="text-center opacity-80">{postedDate}</p>
      {/if}

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
      {#each contentData as data}
        {@html data}
      {/each}
    </div>

    <!-- link  -->
    <div class="w-3/12 flex flex-col gap-2">
      {#each post as data}
        <div>
          <img src={data.authImg} alt="" class="rounded-full w-20 h-20" />
        </div>
        <div>
          <h2 class="font-bold text-lg">By {data.auth}</h2>
        </div>
        <div class="mt-[4rem]">
          Found in:
          <div class="flex gap-2 mt-2 flex-wrap">
            {#each tag as tg}
              {#each tg as tt}
                <div
                  class="px-4 border-2 border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
                >
                  <p>{tt}</p>
                </div>
              {/each}
            {/each}
          </div>
        </div>
        <div class="mt-[4rem]">
          Share:
          <div class="flex gap-2 mt-2"></div>
        </div>
      {/each}
    </div>
    <div>
      <div>
        <p class="font-semibold text-2xl mt-[4rem]">Related Blogs:</p>
      </div>

      <RelatedBlog rb={relatedPosts} />
    </div>
  </div>
</section>
