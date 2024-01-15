<script>
  import { allTags } from "$lib/store/stores.js";
  export let data;

  let tagsAll = JSON.parse(data.tagData);

  $: {
    $allTags = tagsAll;
  }

  let selectedTags = [];

  function selectFn(tag) {
    // Check if the tag is already selected
    const index = selectedTags.indexOf(tag);

    if (index === -1) {
      selectedTags = [...selectedTags, tag];
      console.log(selectedTags);
    } else {
      // Tag is selected, so remove it from the selectedTags array
      selectedTags = selectedTags.filter((t) => t !== tag);
      console.log(selectedTags);
    }
  }

  function confirmDelete() {
    if (selectedTags.length === 0) {
      alert("Please select at least one tag before deleting.");
      event.preventDefault();
    } else if (confirm("Are you sure you want to delete this Tag?")) {
      document.querySelector('form[action="?/deletePost"]').submit();
    } else {
      event.preventDefault();
    }
  }
</script>

<section
  class="flex flex-col justify-center items-center text-center w-full mx-auto md:ml-[14rem]"
>
  <h2
    class="text-center font-semibold text-2xl sticky py-2 headingShadow w-full top-0 z-10"
  >
    All Tags
  </h2>

  <ul class="flex gap-2 mt-4 w-6/12 flex-wrap">
    {#if tagsAll.length === 0}
      <p class="ml-[4rem] font-semibold">No Tags are available</p>
    {:else}
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
    {/if}
  </ul>
  <!-- Delete tag  -->
  <div class="flex w-6/12 gap-2">
    <form action="?/removeTag" method="post" on:submit={confirmDelete}>
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
  <!-- Add tag  -->
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
      class="border border-green-300 caret-green-400 px-2 py-1 outline-none rounded-md w-8/12"
    />
    <button
      type="submit"
      class="bg-green-400 px-3 py-1 text-white rounded-md hover:bg-green-500 transition-all delay-100"
      >Add Tag</button
    >
  </form>
</section>
