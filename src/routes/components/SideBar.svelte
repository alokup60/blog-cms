<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  onMount(() => {
    if (typeof window !== "undefined") {
      // This ensures that we are running in a browser environment
      let listItems = document.querySelectorAll("#list-items li");

      listItems.forEach(function (item) {
        item.addEventListener("click", function () {
          listItems.forEach(function (li) {
            li.classList.remove("active");
          });

          item.classList.add("active");
        });
      });
    }
  });

  let openSideBar = true;
  function isOpen() {
    openSideBar = !openSideBar;
  }
</script>

<!-- Nav -->
<aside
  class={`${
    openSideBar ? "w-60" : "w-20"
  } bg-gray-800  text-white h-screen fixed`}
>
  <div
    class="absolute -right-3 bg-gray-700 border-2 border-red-400 rounded-full px-3 py-2 top-7 cursor-pointer hover:bg-green-400"
    on:click={isOpen}
  >
    {#if openSideBar}
      <i class="fa-solid fa-arrow-left"></i>
    {:else}
      <i class="fa-solid fa-arrow-right"></i>
    {/if}
  </div>
  <nav class={`flex flex-col gap-2 `}>
    <div class="px-2 py-4 bg-green-400">
      <p class="font-bold">BLOG CMS</p>
    </div>
    <ul class="space-y-2 w-full" id="list-items">
      <li
        class="flex items-center gap-4 cursor-pointer justify-between p-2 hover:bg-gray-700 hover:text-green-400"
      >
        {#if openSideBar}
          <i class="fa-solid fa-house"> </i>
          <a href="/cms/home" class="w-full">Home</a>
        {:else}
          <div
            class="text-center flex justify-center items-center w-full mx-auto cursor-pointer rounded-full border-2 py-2"
          >
            <a href="/cms/home"><i class="fa-solid fa-house"></i></a>
          </div>
        {/if}
      </li>

      <li
        class="flex items-center gap-4 cursor-pointer justify-between p-2 hover:bg-gray-700 hover:text-green-400"
      >
        {#if openSideBar}
          <i class="fa-solid fa-pen"></i>
          <a href="/cms/newBlog" class="w-full">New Blog</a>
        {:else}
          <div
            class="text-center flex justify-center items-center w-full mx-auto cursor-pointer rounded-full border-2 py-2"
          >
            <a href="/cms/newBlog" class="w-full"
              ><i class="fa-solid fa-pen"></i></a
            >
          </div>
        {/if}
      </li>

      <li
        class="flex items-center gap-4 cursor-pointer justify-between p-2 hover:bg-gray-700 hover:text-green-400"
      >
        {#if openSideBar}
          <i class="fa-solid fa-newspaper"></i>
          <a href="/cms/viewPost" class="w-full">View Post</a>
        {:else}
          <div
            class="text-center flex justify-center items-center w-full mx-auto cursor-pointer rounded-full border-2 py-2"
          >
            <a href="/cms/viewPost" class="w-full"
              ><i class="fa-solid fa-newspaper"></i></a
            >
          </div>
        {/if}
      </li>

      <li
        class="flex items-center gap-4 cursor-pointer justify-between p-2 hover:bg-gray-700 hover:text-green-400"
      >
        {#if openSideBar}
          <i class="fa-solid fa-tag"></i>
          <a href="/cms/allTags" class="w-full">All Tags</a>
        {:else}
          <div
            class="text-center flex justify-center items-center w-full mx-auto cursor-pointer rounded-full border-2 py-2"
          >
            <a href="/cms/allTags"> <i class="fa-solid fa-tag"></i></a>
          </div>
        {/if}
      </li>
    </ul>
  </nav>
</aside>

<style>
  .active {
    background-color: gray;
    color: white;
  }
</style>
