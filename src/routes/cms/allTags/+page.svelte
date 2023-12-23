<script>
  import { allTags } from "$lib/store/stores.js";

  export let data;
  // console.log(data);

  let tagsAll = JSON.parse(data.tagData);

  $: {
    $allTags = tagsAll;
  }

  // function deleteFn(val) {
  //   selectedTags = selectedTags.filter(function (item) {
  //     return item !== val;
  //   });
  //   console.log(selectedTags);
  // }

  let selectedTags = [];

  function selectFn(tag) {
    // Check if the tag is already selected
    const index = selectedTags.indexOf(tag);

    if (index === -1) {
      // Tag is not selected, so add it to the selectedTags array
      selectedTags = [...selectedTags, tag];
      console.log(selectedTags);
    } else {
      // Tag is selected, so remove it from the selectedTags array
      selectedTags = selectedTags.filter((t) => t !== tag);
      console.log(selectedTags);
    }
  }

  // function removeElem(selectedTag) {
  //   selectedTags = selectedTags.filter((item) => item !== selectedTag);
  //   console.log(selectedTag);
  // }
</script>

<section class="lg:ml-72 pt-8 mx-auto">
  <h2 class="text-center w-full mx-auto font-bold text-2xl">All Tags</h2>
  <ul class="flex gap-2 mt-4 w-6/12 flex-wrap">
    {#each tagsAll as tag}
      <li
        class={`bg-gray-400 text-white px-3 py-1 rounded-md cursor-pointer ${
          selectedTags.includes(tag) ? "bg-green-500" : "bg-gray-400"
        }`}
        on:click={() => selectFn(tag)}
      >
        {tag}
      </li>
    {/each}
  </ul>
  <div class="flex w-6/12 gap-2">
    <!-- <button
      class="bg-orange-500 text-white px-3 py-1 hover:bg-orange-800 transition-all delay-100 rounded-md"
      >Edit</button
    > -->
    <form action="?/removeTag" method="post">
      <input
        type="text"
        class="opacity-0"
        name="removetag"
        bind:value={selectedTags}
      />
      <button
        type="submit"
        class={`px-3 py-1 hover:transition-all hover:delay-100 mt-4 rounded-md flex justify-end ${
          selectedTags
            ? "bg-red-500 text-white hover:bg-red-800"
            : "bg-green-500 placeholder-opacity-100 text-white opacity-50 cursor-not-allowed"
        }`}
      >
        Delete
      </button>
    </form>
  </div>
  <form
    class="flex justify-between mt-4 w-6/12 items-center"
    action="?/addTag"
    method="POST"
  >
    <input
      type="text"
      name="newTag"
      value=""
      placeholder="Enter New Tag Name"
      class="border px-2 py-1 outline-none rounded-md w-8/12"
    />
    <button
      type="submit"
      class="bg-green-400 px-3 py-1 text-white rounded-md hover:bg-green-500 transition-all delay-100"
      >Add Tag</button
    >
  </form>
</section>
