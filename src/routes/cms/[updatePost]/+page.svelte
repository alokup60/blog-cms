<script>
  import { goto } from "$app/navigation";
  import Seo from "../../components/Seo.svelte";
  import { onMount } from "svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  export let data;
  export let form;
  // console.log(JSON.parse(data.newdata));
  // console.log(JSON.parse(data.authorData));
  // start form here for showing image (Preview)
  let input;
  let updatedDate = new Date().toISOString().split("T")[0];

  let showImage = false;

  const showToast = () => {
    const toast = toasts.add({
      title: "Success",
      description: "Form Updated Successfully!",
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

  onMount(async () => {
    if (form?.success) {
      showToast();
      goto("./viewPost");
    }
  });

  let post = JSON.parse(data.newdata);
  console.log(post);
  let contentData = JSON.parse(data.body);
  let tags = JSON.parse(data.alltags);
  let authorData = JSON.parse(data.authorData);
  let blogTags;
  let newtags;
  let selectedTags = [];
  let allTags = [];

  // post.map((item) => {
  //   console.log(item.dt);
  // });
  // let upDate;
  // if (post) {
  //   post.map(async (item) => {
  //     upDate = await item.updatedDt;
  //     console.log(upDate);
  //   });
  // }

  //blogTags
  post.map((item) => {
    blogTags = item.tags;
    // console.log(blogTags);
  });
  //allTags
  tags.forEach((element) => {
    newtags = element.newdata;
    // console.log(newtags, "new");
  });

  const getSelectedTags = async () => {
    try {
      const tags = await blogTags;
      selectedTags = [...selectedTags, ...tags];
      blogTags = [...blogTags, ...selectedTags];
      selectedTags = selectedTags.filter((val) => !allTags.includes(val));
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };
  getSelectedTags();

  const getAllTags = async () => {
    try {
      const tags = await newtags;
      allTags = [...allTags, ...tags];
      allTags = allTags.filter((val) => !selectedTags.includes(val));
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };
  getAllTags();

  const selectedFn = (tg) => {
    const index = selectedTags.indexOf(tg);
    if (index === -1) {
      selectedTags = [...selectedTags, tg];
    } else {
      selectedTags = selectedTags.filter((tag) => tag !== tg);
    }
    allTags = allTags.filter((tag) => !selectedTags.includes(tag));
  };

  const unSelectedFn = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index === -1) {
      selectedTags = [...selectedTags, tag];
    } else {
      selectedTags = selectedTags.filter((item) => item !== tag);
      allTags = [...allTags, tag];
    }
  };

  let newImg;
  post.forEach((element) => {
    newImg = element.img;
    // console.log(newImg);
  });
  // console.log(newImg);
  const uploadImg = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        newImg = e.target.result;
        showImage = true;
        input = newImg;
      };

      reader.readAsDataURL(file);
    }
  };

  //show image in editing mode (selected by default) ****important*******
  const url = newImg;
  const fileName = "myFile.jpg";
  let extraced;
  onMount(async () => {
    await fetch(url).then(async (response) => {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        const blob = await response.blob();
        const file = new File([blob], fileName, {
          type: "image",
        });

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        fileInput.files = dataTransfer.files;

        if (fileInput.webkitEntries && fileInput.webkitEntries.length) {
          fileInput.dataset.file = dataTransfer.files[0].name;
        }
      }
    });
  });
  // let updatedDt = post[0]?.updatedDt || "";
  // const handleSubmit = () => {
  //   if (!upDate) {
  //     alert("Please select the Updated At date.");
  //     event.preventDefault();
  //   } else {
  //     showToast();
  //   }
  // };
  // function handleSubmit() {
  //   if (!upDate) {
  //     document.querySelector('form[action="?/updatePost"]');
  //     event.preventDefault();
  //   } else {
  //     showToast();
  //   }
  // }

  let authVal;
  function selectHandler(e) {
    let a = document.getElementById("auth");
    a = a.value;
    authVal = authorData[a];
    console.log(authVal);
  }
  // selectHandler();
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
    <form
      class="  py-4 bx px-4 rounded-md"
      method="POST"
      action="?/updatePost"
      enctype="multipart/form-data"
    >
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
      <!-- author-details  -->
      <div class="flex flex-col justify-between">
        <label for="auth" class="font-semibold text-md">Created By</label>
        <select
          class="border w-full px-2 py-1 rounded-md outline-none"
          name="authorName"
          id="auth"
          on:change={() => selectHandler()}
        >
          <option selected> choose Auth</option>
          {#each authorData as auth, i}
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
      </div>

      <!-- created At  -->
      <div class="flex flex-col justify-between">
        <label for="dt" class="font-semibold text-md">Posted On</label>
        <input
          type="date"
          name="dt"
          id="dt"
          min={item.dt}
          bind:value={item.dt}
          placeholder="Created at"
          class="border w-full px-2 py-1 rounded-md outline-none"
        />
      </div>
      <!-- updated Date  -->
      <div class="flex flex-col justify-between">
        <label for="dt" class="font-semibold text-md">Updated At</label>

        <input
          type="date"
          id="dt"
          name="updatedDt"
          min={item.dt}
          bind:value={item.updatedDt}
          placeholder="Enter Date"
          class="border w-full px-2 py-1 rounded-md outline-none"
        />
      </div>

      <!-- create textbox -->
      <div class="flex flex-col justify-between">
        <label for="content" class="font-semibold text-md">Content</label>
        <div class="w-full border rounded">
          {@html contentData}
          <textarea
            name="content"
            bind:value={contentData}
            placeholder="Enter Content"
            rows="8"
            class="border w-full px-2 py-1 rounded-md outline-none resize-none"
          ></textarea>
        </div>
      </div>
      <!-- image for cover  -->
      <div class="flex flex-col w-full border bg-white rounded-md px-1">
        <label for="fileUpload" class="font-semibold text-md"
          >Upload Image</label
        >
        <div class="flex flex-col w-full border bg-white rounded-md px-1">
          <div
            class="border-2 border-dashed flex justify-center mx-auto my-4 items-center w-3/12 h-[15rem] rounded-md"
          >
            {#if newImg}
              <img src={newImg} alt="Preview" class="w-full h-full" />
            {:else}
              <span>Image Preview</span>
            {/if}
          </div>
          <div
            class="flex flex-col justify-center mx-auto items-center w-3/12 gap-2 py-2 bg-green-200 px-2 my-2 rounded-md text-green-600"
          >
            <input
              name="fileUpload"
              id="fileName"
              accept="image/*"
              on:change={uploadImg}
              type="file"
            />
          </div>
        </div>

        <div class="justify-center flex mx-auto w-full mb-2">
          <input
            type="text"
            placeholder="Enter Alt Tag"
            name="altForWebPrev"
            bind:value={item.altForWebPrev}
            class="w-6/12 border border-green-300 outline-none rounded-md px-2 py-1 caret-green-300"
          />
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
                checked
                class={`tag-check bg-gray-400 px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none ${
                  blogTags.includes(tag) ? "bg-green-500" : "bg-gray-400"
                } 
          }`}
              />
              <label for={tag} on:click={() => unSelectedFn(tag)}>{tag}</label>
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
          {#if allTags}
            {#each allTags as tg}
              <div class="check">
                <input
                  value={tg}
                  id={tg}
                  name="tags"
                  type="checkbox"
                  class={`tag-check bg-gray-400  flex px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none   
          }`}
                />
                <label for={tg} on:click={() => selectedFn(tg)}>{tg}</label>
              </div>
            {/each}
          {/if}
        </div>
      </div>

      <Seo {post} />

      <div class="mt-[2rem]">
        <input type="checkbox" name="publish_confirmation" checked={false} />
        <label for="publish_confirmation">Publish Confirmation</label>
      </div>

      <button
        type="submit"
        class="bg-blue-400 py-2 mt-8 px-4 text-white rounded-md flex justify-center items-center mx-auto hover:bg-blue-500 transition-all duration-200"
        >Update</button
      >
      <ToastContainer let:data>
        <FlatToast {data} />
      </ToastContainer>
    </form>
  </div>
{/each}

<style>
  .bx {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  /* input[type="checkbox"] {
    display: none;
  } */
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
  /*.check input:checked + label {
    background-color: green;
  }*/
</style>
