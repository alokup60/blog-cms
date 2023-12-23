<script>
  import { blogForm } from "$lib/store/stores.js";
  // console.log(typeof $blogForm);
  // let formData = $blogForm;
  // $: {
  //   $blogForm = allData;
  // }
  // const
  // function deleteItem() {}
</script>

<section class="lg:ml-72 mx-auto">
  <!-- <h2 class="text-center text-2xl font-bold">This is View Page</h2> -->

  <div class="w-full flex mx-auto flex-wrap gap-4 pt-20">
    {#each $blogForm as data}
      <div
        class="flex border-2 px-4 py-2 rounded-md w-[30%] min-h-[20rem] flex-wrap"
      >
        <div class="flex justify-between flex-col">
          <div class="flex justify-between">
            <p class="font-semibold text-xl tracking-wider">
              {data.title}
            </p>
            <div class="flex flex-col gap-2">
              <button
                class="editBtn text-orange-400 hover:text-orange-700 transition-all duration-200"
                type="button"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button
                class="deleteBtn text-red-500 hover:text-red-800 transition-all duration-200"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div><p class="opacity-80">{data.desc}</p></div>
          <div class="flex justify-between">
            <p class="cursor-pointer tracking-wider">Read More...</p>
            <p class="font-semibold tracking-wider">by {data.auth}</p>
          </div>

          <div class="flex">
            <ul class="flex gap-2 flex-wrap">
              {#each data.tags as tag}
                <li class="bg-gray-500 text-white px-2 py-1 rounded-md mt-4">
                  {tag}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
