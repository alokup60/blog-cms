<script>
  // import Tiptap from "$lib/tipTap/Tiptap.svelte";
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  export let data;
  export let form;

  // console.log(data.contData, "page waala");

  // let html = "";
  // let arr_html = [
  //   {
  //     html: `{${formData.content}}`,
  //     // klass: "p-2 text-3xl",
  //   },
  // ];

  //display in form
  let date = new Date().toISOString().split("T")[0];

  //display in preview
  // const dt = new Date();
  // let day = dt.getDate();
  // let formattedDay = day < 10 ? "0" + day : day;
  // let monthName = dt.toLocaleString("default", { month: "long" });
  // let year = dt.getFullYear();
  // let currentDate = `${monthName} ${formattedDay}, ${year}`;

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
    // console.log(e.target.value);
  }

  function uploadWebImg() {
    let file = document.getElementById("webInp").files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let image_1 = document.createElement("img");
      let image_2 = document.createElement("img");

      let val = e.target.result;

      image_1.src = val;
      image_2.src = val;

      document.getElementById("webPrev").appendChild(image_1);
      document.getElementById("webImg").appendChild(image_2);
    };

    reader.readAsDataURL(file);
  }

  //mobile image
  function uploadMobImg() {
    let file = document.getElementById("mobInp").files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let image_3 = document.createElement("img");
      let image_4 = document.createElement("img");
      let val = e.target.result;
      image_3.src = val;
      image_4.src = val;

      document.getElementById("mobPrev").appendChild(image_3);
      document.getElementById("mobileImg").appendChild(image_4);
    };
    // you have to declare the file loading
    reader.readAsDataURL(file);
  }

  //image preview and generate url for link
  let src;
  function uploadAuthImg(e) {
    const [file] = imgInp.files;
    if (file) {
      let img = URL.createObjectURL(file);
      src = img;
      console.log(img);
      console.log(typeof img);
    }
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
  let element;
  let editor;
  let onTransaction;
  let newdata = ""; // Assuming newdata is declared in the component
  // let newdata;

  // onMount(() => {
  //   editor = new Tiptap({
  //     element: element,
  //     onTransaction: (transaction) => {
  //       newdata = editor.getHTML();
  //     },
  //   });
  // });

  // onDestroy(() => {

  //   if (editor) {
  //     editor.destroy();
  //   }
  // });

  // console.log("Editor:", editor);
  // console.log("HTML Content:", editor?.getHTML?.());

  //uploading content to DB

  // const saveToDatabase = async () => {
  //   const formData = new FormData();
  //   formData.append("htmlContent", editor.getHTML());

  //   const response = await fetch("/api/save", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       "Content-Type": "application/json", // Specify content type as JSON
  //     },
  //   });

  //   if (response.ok) {
  //     console.log("Data saved successfully.");
  //   } else {
  //     console.error("Failed to save data.");
  //   }
  // };
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
    <div class="flex gap-4">
      <a href="#">Edit</a>
      <button type="button" on:click={fun}>Preview</button>
    </div>
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
    </div>
    <!-- Author Name  -->
    <div class="flex flex-col justify-between">
      <label for="auth" class="font-semibold text-md">Created By</label>
      <input
        type="text"
        name="auth"
        bind:value={formData.author}
        placeholder="Enter Author Name"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <!-- Date  -->
    <div class="flex flex-col justify-between">
      <label for="dt" class="font-semibold text-md">Date</label>
      <input
        type="date"
        id="dt"
        name="dt"
        bind:value={date}
        placeholder="Enter Date"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
    </div>
    <!-- author image  -->
    <div>
      <label class="font-semibold text-md" for="authImg">Autor Image</label>
      <div class="flex flex-col w-full border bg-white rounded-md px-1">
        <div
          class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-2/12 h-[10rem] rounded-md"
        >
          <img {src} width="100px" />
        </div>
        <div
          class="flex flex-col justify-center mx-auto items-center w-3/12 gap-2 py-2 px-2 my-2 bg-green-200 rounded-md text-green-600"
        >
          <input
            id="imgInp"
            name="authorUpload"
            accept="image/*"
            value=""
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
            class="w-full border outline-none px-2 resize-none"
            rows="10"
            name="content"
            bind:value={formData.content}
          ></textarea>
        </div>
        <!-- <button type="button" on:click={saveToDatabase}>Save to Database</button
        > -->
      </div>
      <!-- image for cover  -->
      <div class="flex flex-col justify-between">
        <label for="fileUpload" class="font-semibold text-md"
          >Upload Image</label
        >
        <div class="flex flex-col w-full border bg-white rounded-md px-1">
          <!-- //mobile preview  -->
          <div class="hidden sm:flex justify-between w-10/12 mx-auto">
            <div class="flex flex-col w-full justify-between mx-auto">
              <div
                class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-7/12 h-[15rem] rounded-md"
              >
                <div id="mobPrev"></div>
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
          </div>
        </div>

        <!-- option -->
        <div class="flex gap-2 relative flex-wrap py-4">
          <label for="tags" class="font-semibold text-md">Tags</label>

          {#each tags as tag}
            <div class="check">
              <input
                on:change={addTags}
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
      <div>
        <img {src} />
      </div>
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
