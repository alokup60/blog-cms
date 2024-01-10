<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { blogForm } from "$lib/store/stores.js";

  const detailView = (title) => {
    let str = title.replace(/\s/g, "-");
    console.log(str);
    goto(str);
  };

  //sorted according to date
  const convertToDate = (dateString) => new Date(dateString);
  $: sortedBlogs = $blogForm.slice().sort((a, b) => {
    return convertToDate(b.dt) - convertToDate(a.dt);
  });
</script>

<section class="w-11/12 flex mx-auto flex-wrap flex-col">
  <h2 class="text-center font-semibold text-2xl">Home Page of Blogs</h2>
  <div class="w-full flex mx-auto mt-4 flex-wrap gap-4">
    {#each sortedBlogs as data (data._id)}
      <div
        on:click={() => detailView(data.title)}
        class="flex border px-4 py-2 rounded-md w-[30%] min-h-[20rem] hover:bg-gray-100 cursor-pointer"
        key={data._id}
      >
        <div class="flex justify-between flex-col">
          <div>
            <img src={data.img} alt="cover_img" class="rounded-md" />
          </div>
          <hr class="mt-2" />
          <div>
            <p class="font-semibold text-xl tracking-wider">{data.title}</p>
          </div>

          <div class="flex">
            <div class="flex gap-4">
              <img
                src={data.authImg}
                alt="auth_img"
                class="w-[45px] rounded-full object-cover h-[45px]"
              />
              <div>
                <p>{data.auth}</p>

                <p class="opacity-80">{data.dt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
