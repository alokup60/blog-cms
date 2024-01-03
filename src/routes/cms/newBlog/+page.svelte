<script>
  import { parse } from "cookie";

  export let data;
  export let form;
  const formData = {
    heading: "",
    desc: "",
    content: "",
    author: "",
    // mobImg:
    tag: [],
  };
  // console.log(data.tagData);

  //image preview start from here
  let mobInput;
  let webInput;
  let mobContainer;
  let webContainer;
  let mobImg;
  let webImg;
  let mobPlaceholder;
  let webPlaceholder;
  let mobImage = false;
  let webImage = false;
  let inpAuth;
  let authContainer;
  let authImg;
  let authPlaceholder;
  let authImage = false;
  // let heading;
  // let desc;
  // let content;
  // let author;
  // let tag;
  function uploadWebImg() {
    const file = webInput.files[0];

    if (file) {
      webImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        webImg.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);

      return;
    }
    webImage = false;
  }

  function uploadMobImg() {
    const file = mobInput.files[0];

    if (file) {
      mobImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        mobImg.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);

      return;
    }
    mobImage = false;
  }

  function uploadAuthImg() {
    const file = inpAuth.files[0];

    if (file) {
      authImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        authImg.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);

      return;
    }
    authImage = false;
  }
  // end here.......

  let tags = JSON.parse(data.tagData); //tags
  let files;
  $: if (files) {
    console.log(files);
  }
  function fun() {
    document.getElementById("prev").style.display = "block";
    // document.getElementById("prev").style.color = "red";
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
    <div class="flex gap-4">
      <a href="">Edit</a>
      <!-- <a href="../preview">Preview</a> -->
      <button type="button" on:click={fun}>Preview</button>
    </div>
    <div class="flex flex-col justify-between">
      <label for="title" class="font-semibold text-md">Title</label>
      <input
        type="text"
        name="title"
        bind:value={formData.heading}
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
        bind:value={formData.author}
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <!-- author image  -->
    <div>
      <label class="font-semibold text-md" for="authImg">Autor Image</label>
      <div class="flex flex-col w-full border bg-white rounded-md px-1">
        <div
          bind:this={authContainer}
          class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-2/12 h-[10rem] rounded-md"
        >
          {#if authImage}
            <img
              bind:this={authImg}
              src=""
              alt="Preview"
              class="w-full h-full"
            />
          {:else}
            <span bind:this={authPlaceholder}>Author image</span>
          {/if}
          <!-- <span></span> -->
        </div>
        <div
          class="flex flex-col justify-center mx-auto items-center w-3/12 gap-2 py-2 px-2 my-2 bg-green-200 rounded-md text-green-600"
        >
          <input
            name="authorUpload"
            accept="image/*"
            bind:this={inpAuth}
            on:change={uploadAuthImg}
            type="file"
          />
        </div>
      </div>
      <!-- create textbox -->
      <div class="flex flex-col justify-between">
        <label for="content" class="font-semibold text-md">Content</label>
        <div class="w-full border rounded">
          <textarea
            name="content"
            bind:value={formData.content}
            placeholder="Enter Content"
            rows="8"
            class="border w-full px-2 py-1 rounded-md outline-none resize-none"
          ></textarea>
        </div>
      </div>
      <!-- image for cover  -->
      <div class="flex flex-col justify-between">
        <label for="fileUpload" class="font-semibold text-md"
          >Upload Image</label
        >
        <div class="flex flex-col w-full border bg-white rounded-md px-1">
          <!-- //mobile preview  -->
          <div class="flex justify-between w-10/12 mx-auto">
            <div class="flex flex-col w-full justify-between mx-auto">
              <div
                bind:this={mobContainer}
                class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-7/12 h-[15rem] rounded-md"
              >
                {#if mobImage}
                  <img
                    bind:this={mobImg}
                    src=""
                    alt="Preview"
                    class="w-full h-full"
                  />
                {:else}
                  <span bind:this={mobPlaceholder}>Mobile Preview</span>
                {/if}
              </div>
              <div
                class="flex flex-col justify-center mx-auto items-center w-7/12 gap-2 py-2 px-2 my-2 bg-green-200 rounded-md text-green-600"
              >
                <input
                  name="mobileUpload"
                  accept="image/*"
                  bind:this={mobInput}
                  on:change={uploadMobImg}
                  type="file"
                />
              </div>
            </div>

            <!-- web preview  -->
            <div class="flex flex-col w-full justify-between mx-auto">
              <div
                bind:this={webContainer}
                class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-7/12 h-[15rem] rounded-md"
              >
                {#if webImage}
                  <img
                    bind:this={webImg}
                    src=""
                    alt="Preview"
                    class="w-full h-full"
                  />
                {:else}
                  <span bind:this={webPlaceholder}>Web Preview</span>
                {/if}
              </div>
              <div
                class="flex flex-col justify-center mx-auto items-center w-7/12 gap-2 py-2 my-2 bg-green-200 rounded-md text-green-600"
              >
                <input
                  name="fileUpload"
                  accept="image/*"
                  bind:this={webInput}
                  on:change={uploadWebImg}
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- option -->
        <div class="flex gap-2 relative flex-wrap py-4">
          <label for="tags" class="font-semibold text-md">Tags</label>

          {#each tags as tag}
            <div class="check">
              <input
                bind:value={formData.tag}
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
    </div>
  </form>

  <!-- Preview  -->
  <div
    class="w-8/12 hidden justify-center items-center mx-auto bx py-4"
    id="prev"
  >
    <h1 class="text-center font-semibold text-2xl">Preview</h1>
    <div class="w-10/12 flex flex-col justify-center mx-auto">
      <div>
        <h1 class="font-bold text-2xl text-center">{formData.heading}</h1>
      </div>
      <div class="w-4/12 justify-center mx-auto px-4">
        <p class="px-4">{formData.desc}</p>
      </div>
      <div>
        <p>By {formData.author}</p>
      </div>
      <div>
        <p>{@html formData.content}</p>
      </div>
      <div>
        {formData.tag}
      </div>
    </div>
  </div>
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

  /* .preview {
    overflow: hidden;
    width: 200px;
    height: 200px;
  } */
  /* .selected-button {
    background-color: green;
  } */
  /* .selected-button:hover {
    display: none;
  } */
  #tss {
    display: none;
  }
</style>
