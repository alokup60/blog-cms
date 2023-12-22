<script>
  import { allTags } from "$lib/store/stores.js";

  export let data;

  let tagsAll = JSON.parse(data.tagData);

  $: {
    $allTags = tagsAll;
  }
</script>

<section class="lg:ml-72 relative pt-5 w-full mx-auto">
  <h2 class="text-center w-full mx-auto font-bold text-2xl">All Tags</h2>
  <ul class="flex justify-between mt-4 w-8/12">
    {#each tagsAll as tag}
      <li
        class="bg-gray-400 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-gray-500 transition-all delay-100"
      >
        {tag}
      </li>
    {/each}
  </ul>
  <div class="flex justify-between mt-4 w-6/12 items-center">
    <input
      type="text"
      name="newTag"
      placeholder="Enter New Tag Name"
      class="border px-2 py-1 outline-none rounded-md"
    />
    <button
      type="button"
      class="bg-green-400 px-3 py-1 text-white rounded-md hover:bg-green-500 transition-all delay-100"
      >Add Tag</button
    >
  </div>
</section>
