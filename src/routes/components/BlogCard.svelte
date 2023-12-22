<script>
  import { blogForm } from "$lib/store/stores.js";
  let blogData = $blogForm;

  // $: {
  //   if (blogData) {
  //     console.log(blogData);
  //   }
  // }
</script>

<section class="w-11/12 flex mx-auto flex-wrap flex-col">
  <h2 class="text-center font-semibold text-2xl">Home Page of Blogs</h2>
  <div class="w-full flex mx-auto mt-4 flex-wrap gap-4">
    {#each $blogForm as data}
      <div class="flex border px-4 py-2 rounded-md w-[30%] min-h-[20rem]">
        <div class="flex justify-between flex-col">
          <div>
            <p class="font-semibold text-xl tracking-wider">{data.title}</p>
          </div>

          <div><p class="opacity-80">{data.desc}</p></div>
          <div class="flex justify-between">
            <p class="cursor-pointer tracking-wider">Read More...</p>
            <p class="font-semibold tracking-wider">by {data.auth}</p>
          </div>

          <!-- <p>{data.content}</p> -->

          <!-- <ul class="flex gap-4">
            {#each data.tags as tag}
              <li class="bg-gray-500 text-white px-2 py-1 rounded-md mt-4">
                {tag}
              </li>
            {/each}
          </ul> -->
        </div>
        <!-- <div class="flex flex-col">
          <button
            class="editBtn text-orange-400 hover:text-orange-700 transition-all duration-200"
            type="button">Edit</button
          >
          <button
            class="deleteBtn text-red-500 hover:text-red-600 transition-all duration-200"
            type="button">Delete</button
          >
        </div> -->
      </div>
    {/each}
  </div>
</section>
