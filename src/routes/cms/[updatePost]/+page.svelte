<script>
  import imgUploader from "$lib/images/imgUploader.svg";
  export let data;

  let post = JSON.parse(data.post); //tags
  let tags = JSON.parse(data.alltags);
  let blogTags;
  let newtags;
  let selectedTags = [];

  post.map((item) => {
    blogTags = item.tags;
    // console.log(blogTags);
  });
  tags.forEach((element) => {
    newtags = element.newdata;
  });

  //   selectedTags = [...blogTags, newtags];

  //   let selectedTags = [];

  const selectedFn = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index > 0) {
      // Tag is not selected, so add it to the selectedTags array
      selectedTags = [...selectedTags, tag];
    }
  };
  $: console.log(blogTags);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</svelte:head>
{#each post as item}
  <div class="lg:ml-72 relative pt-5 min-w-full mx-auto">
    <form class="  py-4 bx px-4 rounded-md" method="POST" action="?/updatePost">
      <h2 class="text-center font-semibold text-2xl">CMS for Blog</h2>
      <div class="flex flex-col justify-between">
        <label for="title" class="font-semibold text-md">Title</label>
        <input
          type="text"
          name="title"
          bind:value={item.title}
          placeholder="Enter title"
          class="border w-full px-2 py-1 rounded-md outline-none"
        />
      </div>

      <div class="flex flex-col justify-between">
        <label for="desc" class="font-semibold text-md">Description</label>
        <input
          type="text"
          name="desc"
          bind:value={item.desc}
          placeholder="Enter title"
          class="border w-full px-2 py-1 rounded-md outline-none"
        />
      </div>
      <div class="flex flex-col justify-between">
        <label for="auth" class="font-semibold text-md">Created By</label>
        <input
          type="text"
          name="auth"
          bind:value={item.auth}
          placeholder="Enter title"
          class="border w-full px-2 py-1 rounded-md outline-none"
        />
      </div>
      <!-- create textbox -->
      <div class="flex flex-col justify-between">
        <label for="content" class="font-semibold text-md">Content</label>
        <div class="w-full border rounded">
          <textarea
            name="content"
            bind:value={item.content}
            placeholder="Enter Content"
            rows="8"
            class="border w-full px-2 py-1 rounded-md outline-none resize-none"
          ></textarea>
        </div>
      </div>
      <!-- image for cover  -->
      <div class="flex flex-col w-full border bg-white rounded-md px-1">
        <div class="flex gap-2">
          <img src={imgUploader} /><span class="text-xl font-semibold"
            >Preview Card</span
          >
        </div>
        <hr />
        <div class="mt-4">
          <p>Cover Image<sup>*</sup></p>
          <div
            class="rounded border flex justify-center flex-col items-center mb-4"
          >
            <div class="mt-4 flex flex-col justify-center items-center">
              <p>Drag a file here</p>
              <p class="opacity-50 text-sm">Max size 20 MB</p>
            </div>

            <div class="flex py-6 justify-center items-center mx-auto">
              <div
                class="bg-green-200 px-2 py-2 rounded-md text-green-600 cursor-pointer flex justify-center text-center items-center mx-auto"
              >
                <div class="flex flex-col">
                  <input type="file" name="file" accept="image/jpg,image/png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- option -->
      <div class="flex gap-2 relative flex-wrap py-4">
        <h2 class="font-semibold text-md">Tags</h2>

        {#if selectedTags && selectedTags.length > 0}
          {#each selectedTags as tag}
            <div class="check">
              <input
                value={tag}
                id={tag}
                name="tags"
                type="checkbox"
                class={`bg-gray-400 px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none ${
                  selectedTags.includes(tag) ? "bg-green-500" : "bg-gray-400"
                } 
          }`}
              />
              <label for={tag}>{tag}</label>
            </div>
          {/each}
        {:else}
          <p><sup>*</sup>No Tags Selected</p>
        {/if}
      </div>

      <!-- all option  -->
      <div class="flex justify-between mx-auto w-full">
        <div class="flex flex-wrap gap-2">
          <h2 class="font-semibold">All Tags</h2>
          {#if newtags}
            {#each newtags as tag}
              <div class="check">
                <input
                  value={tag}
                  id={tag}
                  name="tags"
                  type="checkbox"
                  class={`bg-gray-400  flex px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none  
          }`}
                />
                <label for={tag} on:click={() => selectedFn(tag)}>{tag}</label>
              </div>
            {/each}
          {/if}
        </div>
        <div>
          <button
            class="bg-green-400 px-3 py-1 rounded-md text-white cursor-pointer hover:bg-green-500 transition-all delay-100"
            >Add Tag</button
          >
        </div>
      </div>

      <button
        type="submit"
        class="bg-blue-400 py-2 mt-8 px-4 text-white rounded-md flex justify-center items-center mx-auto hover:bg-blue-500 transition-all duration-200"
        >Update</button
      >
    </form>
  </div>
{/each}

<style>
  .bx {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  input[type="checkbox"] {
    display: none;
  }

  .check label {
    background-color: gray;
    padding: 5px 10px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  /* //important to change bg color of label  */
  .check input:checked + label {
    background-color: green;
  }
  /* .selected-button {
    background-color: green;
  } */
  /* .selected-button:hover {
    display: none;
  } */
</style>
