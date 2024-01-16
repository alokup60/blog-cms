<script>
  import { onMount } from "svelte";

  let openSideBar = true;

  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    updateSidebarState(mediaQuery); // Initial check

    const mediaQueryListener = (event) => {
      updateSidebarState(event.currentTarget);
    };

    mediaQuery.addListener(mediaQueryListener);

    return () => {
      // Cleanup listener on component destruction
      mediaQuery.removeListener(mediaQueryListener);
    };
  });

  function updateSidebarState(mediaQuery) {
    openSideBar = !mediaQuery.matches;
  }

  // function toggleSidebar() {
  //   openSideBar = !openSideBar;
  // }
</script>

<aside
  class={`${
    openSideBar ? "w-60" : "w-20"
  } bg-gray-800 text-white h-screen fixed`}
>
  <nav class={`flex flex-col gap-2 `}>
    <div class="px-2 py-4 bg-green-400">
      <p class="font-bold">BLOG CMS</p>
    </div>
    <ul class="space-y-2 w-full" id="list-items">
      {#if openSideBar}
        {#each [{ icon: "fa-house", href: "/cms/home", text: "Home" }, { icon: "fa-pen", href: "/cms/newBlog", text: "New Blog" }, { icon: "fa-newspaper", href: "/cms/viewPost", text: "View Post" }, { icon: "fa-tag", href: "/cms/allTags", text: "All Tags" }, { icon: "fa-comment", href: "/cms/faq", text: "FAQ" }, { icon: " fa-user", href: "/cms/author", text: "Author List" }] as { icon, href, text }}
          <li
            class="flex items-center gap-4 cursor-pointer justify-between p-2 hover:bg-gray-700 hover:text-green-400"
          >
            <i class={`fa-solid ${icon}`}></i>
            <a {href} class="w-full">{text}</a>
          </li>
        {/each}
      {:else}
        {#each [{ icon: "fa-house", href: "/cms/home" }, { icon: "fa-pen", href: "/cms/newBlog" }, { icon: "fa-newspaper", href: "/cms/viewPost" }, { icon: "fa-tag", href: "/cms/allTags" }] as { icon, href }}
          <li
            class="flex items-center gap-4 cursor-pointer justify-between p-2 hover:bg-gray-700 hover:text-green-400"
          >
            <div
              class="text-center flex justify-center items-center w-full mx-auto cursor-pointer rounded-full border-2 py-2"
            >
              <a {href}><i class={`fa-solid ${icon}`}></i></a>
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </nav>

  <!-- <button
    class="absolute right-3 top-7 cursor-pointer hover:bg-green-400"
    on:click={toggleSidebar}
  >
    {#if !openSideBar}
      <i class="fa-solid fa-arrow-right"></i>
    {/if}
  </button> -->
</aside>

<style>
  .active {
    background-color: gray;
    color: white;
  }
  @media only screen and (min-width: 10px) and (max-width: 700px) {
    aside {
      max-width: 20%;
    }
    nav {
      max-width: 100%;
    }
    nav ul {
      width: 100%;
    }
    nav ul li {
      width: 100%;
    }
    li {
      width: 100%;
      min-width: 60px;
    }
  }
  @media only screen and (min-width: 700px) and (max-width: 900px) {
    aside {
      width: 20%;
    }
    li {
      width: 100%;
      min-width: 60px;
    }
  }
</style>
