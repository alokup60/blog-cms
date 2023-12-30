<script>
  import imgUploader from "$lib/images/imgUploader.svg";
  export let data;
  export let form;
  // console.log(data.tagData);

  let input;
  let container;
  let image;
  let placeholder;
  let showImage = false;

  function uploadImg() {
    const file = input.files[0];

    if (file) {
      showImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);

      return;
    }
    showImage = false;
  }

  // let dialog;
  // if (form?.success) {
  //   console.log("ho gya kaam");
  // }

  let tags = JSON.parse(data.tagData); //tags
  let files;
  $: if (files) {
    console.log(files);
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

<div class="lg:ml-72 relative pt-5 min-w-full mx-auto">
  <form
    class="py-4 bx px-4 rounded-md"
    method="POST"
    enctype="multipart/form-data"
  >
    <h2 class="text-center font-semibold text-2xl">CMS for Blog</h2>
    <div class="flex flex-col justify-between">
      <label for="title" class="font-semibold text-md">Title</label>
      <input
        type="text"
        name="title"
        value=""
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <div class="flex flex-col justify-between">
      <label for="desc" class="font-semibold text-md">Description</label>
      <input
        type="text"
        name="desc"
        value=""
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <div class="flex flex-col justify-between">
      <label for="auth" class="font-semibold text-md">Created By</label>
      <input
        type="text"
        name="auth"
        value=""
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
          value=""
          placeholder="Enter Content"
          rows="8"
          class="border w-full px-2 py-1 rounded-md outline-none resize-none"
        ></textarea>
      </div>
    </div>
    <!-- image for cover  -->
    <div class="flex flex-col justify-between">
      <label for="fileUpload" class="font-semibold text-md">Upload Image</label>
      <div class="flex flex-col w-full border bg-white rounded-md px-1">
        <div
          bind:this={container}
          class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-3/12 h-[15rem] rounded-md"
        >
          {#if showImage}
            <img bind:this={image} src="" alt="Preview" class="w-full h-full" />
          {:else}
            <span bind:this={placeholder}>Image Preview</span>
          {/if}
        </div>
        <div
          class="flex flex-col justify-center mx-auto items-center w-3/12 gap-2 py-2 bg-green-200 px-2 my-2 rounded-md text-green-600"
        >
          <input
            name="fileUpload"
            accept="image/*"
            bind:this={input}
            on:change={uploadImg}
            type="file"
          />
        </div>
      </div>

      <!-- option -->
      <div class="flex gap-2 relative flex-wrap py-4">
        <label for="tags" class="font-semibold text-md">Tags</label>

        {#each tags as tag}
          <div class="check">
            <input
              value={tag}
              id={tag}
              name="tags"
              type="checkbox"
              class={`bg-gray-400 px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none 
          }`}
            />
            <label for={tag}>{tag}</label>
          </div>
        {/each}
      </div>

      <button
        type="submit"
        class="bg-blue-400 py-2 mt-8 px-4 text-white rounded-md flex justify-center items-center mx-auto hover:bg-blue-500 transition-all duration-200"
        >Submit</button
      >
    </div>
  </form>

  <!-- Preview  -->
  <!-- <div class="w-6/12 hidden justify-center items-center mx-auto bx py-4">
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
  </div> -->
</div>

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
