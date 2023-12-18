<script>
  import imgUploader from "$lib/images/imgUploader.svg";
  export let data;
  export let form;
  const formData = {
    title: "",
    desc: "",
    createdBy: "",
    content: "",
    tags: [],
    coverImg: "",
    // authorAvtar:
  };
  let x;
  function removeTags() {
    x = formData.content.replace(/(<([^>]+)>)/gi, "");
    console.log(x);
  }
</script>

<!-- <section>
  {#if form?.success}
    <h1>Success</h1>
  {/if}
</section> -->

<div class="w-10/12 flex justify-center mx-auto bg-white mt-[2rem]">
  <form
    class="w-8/12 flex flex-col gap-3 py-4 bx px-4"
    method="POST"
    action="?/cms"
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
      <input
        type="text"
        name="content"
        bind:value={formData.content}
        on:change={removeTags}
        placeholder="Enter title"
        class="border w-full px-2 py-1 rounded-md outline-none"
      />
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
              <!-- <label for="image" class="cursor-pointer">+ Upload new</label> -->
              <div class="flex flex-col"><input type="file" name="file" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- fix to option -->
    <div class="flex flex-col justify-between">
      <label for="tags" class="font-semibold text-md">Tags</label>
      <select
        value={formData.tags}
        name="tags"
        multiple
        class="border w-full px-2 py-1 rounded-md outline-none"
      >
        <option value="furniture">Furniture</option>
        <option value="nature">Nature</option>
        <option value="mechanical">Mechanical</option>
        <option value="software"> Software </option>
      </select>
    </div>

    <button class="bg-blue-400 py-2 text-white rounded-md">Submit</button>
  </form>
</div>

<style>
  .bx {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>
