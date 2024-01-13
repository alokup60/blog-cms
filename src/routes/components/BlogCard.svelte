<script>
  import { goto } from "$app/navigation";

  export let data;
  console.log(data, "from BlogCard");

  const detailView = (title) => {
    let str = title.replace(/\s/g, "-");
    // console.log(str);
    goto(str);
  };

  // sorted according to date
  const convertToDate = (dateString) => new Date(dateString);
  let sortedBlogs = data.slice().sort((a, b) => {
    return convertToDate(b.dt) - convertToDate(a.dt);
  });

  function formatDate(date) {
    let dt = new Date(date[0]);
    let day = dt.getDate();
    let monthName = dt.toLocaleString("default", { month: "long" });
    let year = dt.getFullYear();
    let formattedDay = day < 10 ? "0" + day : day;
    return `${monthName} ${formattedDay}, ${year}`;
  }
</script>

<section class="w-11/12 justify-center mx-auto flex flex-wrap">
  <h2 class="text-center font-semibold text-2xl mt-4 mb-8 w-full">
    Home Page of Blogs
  </h2>
  <div
    class="w-full flex flex-wrap justify-center gap-2 mx-auto space-x-4 space-y-4"
  >
    {#each sortedBlogs as dt (dt._id)}
      <div
        draggable="true"
        on:click={() => detailView(dt.title)}
        class="flex flex-wrap border px-4 py-2 rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-h-[20rem] hover:shadow-md hover:bg-gray-100 cursor-pointer"
        key={dt._id}
      >
        <div class="flex flex-col w-full">
          {#if dt.img}
            <div>
              <img
                src={dt.img}
                alt="cover_img"
                class="rounded-md w-full mb-4"
              />
            </div>
          {/if}
          <hr class="w-full mt-2 mb-4" />
          {#if dt.title}
            <div>
              <p class="font-semibold text-xl tracking-wider mb-2">
                {dt.title}
              </p>
            </div>
          {/if}

          <div class="flex items-center gap-2">
            {#if dt.authImg}
              <img
                src={dt.authImg}
                alt="auth_img"
                class="w-8 h-8 rounded-full object-cover"
              />
            {/if}
            <div>
              {#if dt.auth}
                <p class="font-semibold text-sm">{dt.auth}</p>
              {/if}
              <div class="flex flex-col">
                {#if dt.dt}
                  <p class="opacity-80 text-xs">
                    <span class="font-semibold">Posted On:</span>
                    {formatDate(dt.dt)}
                  </p>
                {/if}

                {#if dt.updatedDt}
                  <p class="opacity-80 text-xs">
                    <span class="font-semibold">Updated On:</span>
                    {formatDate(dt.updatedDt)}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
