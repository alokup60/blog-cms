<script>
  import { onMount } from "svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import Seo from "../../components/Seo.svelte";
  export let data;
  export let form;

  let parseAuth = JSON.parse(data.authorData);
  let authImg;
  let authName;
  let authAlt;
  parseAuth.map((item) => {
    authAlt = item.authAlt;
    authName = item.authName;
    authImg = item.authImg;
  });

  //toast
  const showToast = () => {
    const toast = toasts.add({
      title: "Success",
      description: "Form submitted successfully",
      duration: 3000,
      placement: "top-right",
      type: "info",
      theme: "dark",
      placement: "top-right",
      showProgress: true,
      type: "success",
      theme: "dark",
      onClick: () => {},
      onRemove: () => {},
    });
  };

  //display in form
  let date = new Date().toISOString().split("T")[0];

  const formData = {
    heading: "",
    desc: "",
    content: "",
    author: "",
    tag: [],
  };

  function addTags(e) {
    let val = e.target.value;
    formData.tag = [...formData.tag, val];
  }

  function uploadWebImg() {
    let previewContainer = document.getElementById("webPrev");
    let fileInput = document.getElementById("webInp");
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let image_1 = document.createElement("img");
      let image_2 = document.createElement("img");

      let val = e.target.result;
      image_1.src = val;
      image_2.src = val;
      previewContainer.innerHTML = "";
      document.getElementById("webPrev").appendChild(image_1);
      document.getElementById("webImg").appendChild(image_2);
    };

    reader.readAsDataURL(file);
  }

  //mobile image
  function uploadMobImg() {
    let previewContainer = document.getElementById("mobPrev");
    let file = document.getElementById("mobInp").files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let image_3 = document.createElement("img");
      let image_4 = document.createElement("img");
      let val = e.target.result;
      image_3.src = val;
      image_4.src = val;

      previewContainer.innerHTML = "";

      document.getElementById("mobPrev").appendChild(image_3);
      document.getElementById("mobileImg").appendChild(image_4);
    };

    reader.readAsDataURL(file);
  }

  let tags = JSON.parse(data.tagData); //tags
  let files;
  $: if (files) {
    console.log(files);
  }
  // function fun() {
  //   document.getElementById("prev").style.display = "block";
  // }

  //form validation
  let errors = {
    heading: "",
    desc: "",
    content: "",
    author: "",
    tag: [],
  };
  let valid = false;

  const submitHandler = () => {
    valid = true;
    if (formData.heading.trim() === "") {
      valid = false;
      errors.heading = "Heading Can't be empty!";
    } else if (formData.heading.trim().length < 4) {
      errors.heading = "Heading must be atleast 4 character long";
    } else {
      errors.heading = "";
    }

    if (formData.desc.trim() === "") {
      valid = false;
      errors.desc = "Description can't be empty.";
    } else if (formData.desc.trim().length < 5) {
      errors.desc = "Description must be atleast 5 character long.";
    } else {
      errors.desc = "";
    }

    if (formData.content === "") {
      valid = false;
      errors.content = "Content can't be empty.";
    } else if (formData.content.trim().length < 10) {
      errors.content = "Content must be atleast 10 character long.";
    } else {
      errors.content = "";
    }

    if (formData.author === "") {
      valid = false;
      errors.author = "Author can't be empty.";
    } else if (formData.author.trim().length < 4) {
      errors.author = "Author must be atleast 4 character long.";
    } else {
      errors.author = "";
    }

    // if (formData.tag.trim().length === 0) {
    //   valid = false;
    //   errors.tag = "Tag can't be empty.";
    // } else {
    //   errors.tag = "";
    // }
  };
  //end here

  onMount(async () => {
    if (form?.success) {
      showToast();
    }
  });
  //author selection
  let authVal;
  function selectHandler(e) {
    let a = document.getElementById("auth");
    a = a.value;
    authVal = parseAuth[a];
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

<div class="md:ml-[18rem] absolute top-0 justify-center mx-auto">
  <h2
    class="text-center font-semibold text-2xl sticky py-2 bg-white headingShadow w-full top-0"
  >
    New Blog
  </h2>

  <form
    class=" bx px-4 max-h-screen overflow-scroll rounded-md"
    method="POST"
    enctype="multipart/form-data"
  >
    <!-- <div class="flex gap-4">
      <a href="#">Edit</a>
      <button type="button" on:click={fun}>Preview</button>
    </div> -->
    <!-- title  -->
    <div class="flex flex-col justify-between">
      <label for="title" class="font-semibold text-md">Title</label>
      <input
        type="text"
        name="title"
        bind:value={formData.heading}
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
      <span class="text-red-500 tracking-wider">{errors.heading} </span>
    </div>
    <!-- Description  -->
    <div class="flex flex-col justify-between">
      <label for="desc" class="font-semibold text-md">Description</label>
      <input
        type="text"
        name="desc"
        bind:value={formData.desc}
        placeholder="Enter Description"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
      <span class="text-red-500 tracking-wider">{errors.desc}</span>
    </div>
    <!-- Author Name  -->
    <div class="flex flex-col justify-between">
      <label for="auth" class="font-semibold text-md">Created By</label>
      <select
        on:change={() => selectHandler()}
        class="border w-full px-2 py-1 rounded-md outline-none"
        name="authName"
        id="auth"
      >
        <option selected> Choose Author </option>
        {#each parseAuth as auth, i}
          <option value={i}>
            {auth.authName}
          </option>
        {/each}
      </select>
      <div class="hidden">
        {#if authVal}
          <input type="text" name="authName" bind:value={authVal.authName} />
          <input type="text" name="authImg" bind:value={authVal.authImg} />
          <input type="text" name="authAlt" bind:value={authVal.authAlt} />
        {/if}
      </div>
      <span class="text-red-500 tracking-wider">{errors.author}</span>
    </div>

    <!-- created Date  -->
    <div class="flex flex-col justify-between">
      <label for="dt" class="font-semibold text-md">Date</label>
      <input
        type="date"
        id="dt"
        name="dt"
        min={date}
        bind:value={date}
        placeholder="Enter Date"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>

    <div>
      <!-- create textbox -->
      <div class="flex flex-col justify-between">
        <label for="content" class="font-semibold text-md">Content</label>
        <div class="w-full border rounded">
          <textarea
            class="w-full border outline-none px-2 resize-none"
            rows="10"
            name="content"
            bind:value={formData.content}
          ></textarea>

          <span class="text-red-500 tracking-wider">{errors.content}</span>
        </div>
      </div>
      <!-- image for cover  -->
      <div class="flex flex-col justify-between">
        <label for="fileUpload" class="font-semibold text-md"
          >Upload Image</label
        >
        <div class="flex flex-col w-full border bg-white rounded-md px-1">
          <!-- //mobile preview  -->
          <div class=" md:hidden sm:flex justify-between w-10/12 mx-auto">
            <div class="flex flex-col w-full justify-between mx-auto">
              <div
                class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-7/12 h-[15rem] rounded-md"
              >
                <div id="mobPrev">Mobile Preview</div>
              </div>
              <div
                class="flex flex-col justify-center mx-auto items-center w-7/12 gap-2 py-2 px-2 my-2 bg-green-200 rounded-md text-green-600"
              >
                <input
                  id="mobInp"
                  name="mobileUpload"
                  accept="image/*"
                  value=""
                  on:change={uploadMobImg}
                  type="file"
                />
              </div>
            </div>

            <div class="justify-center flex mx-auto w-full mb-2">
              <input
                type="text"
                placeholder="Enter Alt Tag"
                name="altForMobPrev"
                class="w-6/12 border border-green-300 outline-none rounded-md px-2 py-1 caret-green-300"
              />
            </div>
          </div>

          <!-- web preview  -->
          <div class="hidden md:flex flex-col w-full justify-between mx-auto">
            <div
              class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-7/12 h-[15rem] rounded-md"
            >
              <div id="webPrev"></div>
            </div>
            <div
              class="flex flex-col justify-center mx-auto items-center w-7/12 gap-2 py-2 my-2 bg-green-200 rounded-md text-green-600"
            >
              <input
                id="webInp"
                name="fileUpload"
                accept="image/*"
                value=""
                on:change={uploadWebImg}
                type="file"
              />
            </div>
          </div>

          <div class="justify-center flex mx-auto w-full mb-2">
            <input
              type="text"
              placeholder="Enter Alt Tag"
              name="altForWebPrev"
              class="w-6/12 border border-green-300 outline-none rounded-md px-2 py-1 caret-green-300"
            />
          </div>
        </div>

        <!-- option -->
        <div class="flex gap-2 flex-wrap py-4">
          <label for="tags" class="font-semibold text-md">Tags</label>

          {#each tags as tag}
            <div class="check">
              <input
                on:change={addTags}
                value={tag}
                id={tag}
                name="tags"
                type="checkbox"
                class={`tag-check bg-gray-400 px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none 
          }`}
              />
              <label for={tag}>{tag}</label>
            </div>
          {/each}
        </div>
        <!-- SEO purpose only  -->
        <Seo />

        <div class="mt-[2rem]">
          <input type="checkbox" name="publish_confirmation" checked={false} />
          <label for="publish_confirmation">Publish Confirmation</label>
        </div>

        <button
          on:click={submitHandler}
          type="submit"
          class="bg-blue-400 py-2 mt-8 px-4 text-white rounded-md flex justify-center items-center mx-auto hover:bg-blue-500 transition-all duration-200"
          >Submit</button
        >
      </div>
      <ToastContainer let:data>
        <FlatToast {data} />
      </ToastContainer>
    </div>
  </form>

  <!-- Preview  -->
  <div class="w-8/12 justify-center items-center mx-auto bx py-4" id="prev">
    <h1 class="text-center font-semibold text-2xl">Preview</h1>
    <div class="w-10/12 flex flex-col justify-center mx-auto">
      <div>
        <h1 class="font-bold text-2xl text-center">{formData.heading}</h1>
      </div>
      <div class="w-4/12 justify-center mx-auto px-4">
        <p class="px-4">{formData.desc}</p>

        <div>
          <!-- mobile image  -->
          <div id="mobileImg"></div>
          <!-- web image  -->
          <div id="webImg"></div>
          <p>{date}</p>
        </div>
      </div>
      <!-- <div>
        <img {src} />
      </div> -->
      <div class="flex justify-between w-full mx-auto">
        <!-- left-side  -->
        <!-- <div class="w-8/12">
          <p>{@html formData.content}</p>
        </div> -->
        <!-- right-side  -->
        <div class="w-4/12 flex flex-col gap-4">
          {#if formData.author}
            <p class="font-semibold">{`By ${formData.author}`}</p>
          {/if}

          <div class="flex flex-wrap gap-2">
            {#each formData.tag as item}
              <div class="px-3 py-1 border-2 rounded-md">{item}</div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .bx {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .tag-check {
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

  .headingShadow {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  /* #tss {
    display: none;
  } */
</style>
