<!-- <script>
  export let blog;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const detailView = (title) => {
    let str = title.replace(/\s/g, "-");
    dispatch("detail-view", { title: str });
  };
</script>

BlogItem.svelte
<div
  on:click={() => detailView(blog.title)}
  on:dragstart={() => dispatch("drag-start", blog)}
  draggable="true"
  class="flex border px-4 py-2 rounded-md w-[30%] min-h-[20rem] hover:bg-gray-100 cursor-pointer"
>
  <div class="flex justify-between flex-col">
    <div>
      <img src={blog.img} alt="cover_img" class="rounded-md" />
    </div>
    <hr class="mt-2" />
    <div>
      <p class="font-semibold text-xl tracking-wider">{blog.title}</p>
    </div>
    <div class="flex">
      <div class="flex gap-4">
        <img
          src={blog.authImg}
          alt="auth_img"
          class="w-[45px] rounded-full object-cover h-[45px]"
        />
        <div>
          <p>{blog.auth}</p>
          <p class="opacity-80">{blog.dt}</p>
        </div>
      </div>
    </div>
  </div>
</div> -->
