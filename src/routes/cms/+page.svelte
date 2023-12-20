<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import imgUploader from "$lib/images/imgUploader.svg";
  import Header from "../Header.svelte";
  export let data;
  export let form;

  //extract every object
  if (form) {
    let blogData = JSON.parse(form.x);
    for (let item = 0; item < blogData.length; item++) {
      let element = blogData[item];
      console.log(element._id);
    }
  }

  // export let blogData;
  // console.log(form?.x);
  const formData = {
    title: "",
    desc: "",
    createdBy: "",
    content: ``,
    tags: ["Mechanical", "Nature", "Civil", "PMKY"],
    selectedTags: [],
    coverImg: "",
    // authorAvtar:
  };

  let tags = formData.tags; //tags
  let selectedTags = formData.selectedTags;

  let x;
  let tagVal;
  function removeTags() {
    x = formData.content.replace(/(<([^>]+)>)/gi, "");
    console.log(x);
  }

  function getTag(e) {
    let val = e.target.value;
    selectedTags = [...selectedTags, val];
    console.log(selectedTags);
  }

  function addTag(e) {
    // let val = e.target.value;
    // console.log(val);
    console.log(tagVal);
    tags.push(tagVal);
    console.log(tags);
  }

  function removeElem(selectedTag) {
    selectedTags = selectedTags.filter((item) => item !== selectedTag);
    console.log(selectedTag);
  }
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

<div class="w-11/12 flex flex-wrap justify-between mx-auto bg-white mt-[2rem]">
  <form
    class="w-5/12 flex flex-col gap-3 py-4 bx px-4"
    method="POST"
    enctype="multipart/form-data"
  >
    <h2 class="text-center font-semibold text-2xl">CMS for Blog</h2>
    <div class="flex flex-col justify-between">
      <label for="title" class="font-semibold text-md">Title</label>
      <input
        type="text"
        name="title"
        bind:value={formData.title}
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <div class="flex flex-col justify-between">
      <label for="desc" class="font-semibold text-md">Description</label>
      <input
        type="text"
        name="desc"
        bind:value={formData.desc}
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <div class="flex flex-col justify-between">
      <label for="auth" class="font-semibold text-md">Created By</label>
      <input
        type="text"
        name="auth"
        bind:value={formData.createdBy}
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <!-- create textbox -->
    <div class="flex flex-col justify-between">
      <label for="content" class="font-semibold text-md">Content</label>
      <div class="w-full border rounded">
        <input
          type="text"
          name="content"
          bind:value={formData.content}
          on:change={removeTags}
          placeholder="Enter Content"
          class="border w-full px-2 py-1 rounded-md outline-none"
        />
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
    <div class="flex flex-col justify-between relative">
      <label for="tags" class="font-semibold text-md">Tags</label>
      <select
        value=""
        on:change={getTag}
        name="tags"
        class="border w-full px-2 py-1 rounded-md outline-none tag-select"
      >
        <option value="" selected>---Select an option---</option>
        {#each tags as tag}
          <option key={tag.index}>{tag}</option>
        {/each}
      </select>
    </div>
    <div class="tag-list">
      <ul class="flex gap-2 flex-wrap items-center">
        {#each selectedTags as selectedTag}
          <li
            class="bg-gray-500 px-3 py-2 rounded-md text-white"
            key={selectedTag.index}
          >
            {selectedTag}
            <button type="button" on:click={() => removeElem(selectedTag)}>
              <i class="fa-solid fa-xmark cursor-pointer"> </i>
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="flex justify-between w-full mx-auto items-center">
      <input
        type="text"
        bind:value={tagVal}
        name="addTag"
        placeholder="Add Tag"
        class="border px-2 py-1 rounded-md outline-none"
      />
      <button
        type="button"
        on:click={addTag}
        class="bg-blue-400 py-2 px-2 text-white rounded-md">Add Tag</button
      >
    </div>

    <button class="bg-blue-400 py-2 text-white rounded-md">Submit</button>
  </form>

  <div class="w-6/12 justify-center items-center mx-auto bx py-4">
    <h1 class="text-center font-semibold text-2xl">Preview</h1>
    <div>
      <h1 class="font-bold text-2xl text-center">{formData.title}</h1>
    </div>
    <div class="w-4/12 justify-center mx-auto px-4">
      <p class="px-4">{formData.desc}</p>
    </div>
    <div>
      <p>{@html formData.content}</p>
    </div>
  </div>

  <div>
    <p></p>
  </div>
</div>

<style>
  .bx {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>
