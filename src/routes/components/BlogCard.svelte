<script>
  import { goto, invalidate } from "$app/navigation";

  export let data;
  console.log(data, "from BlogCard");

  const detailView = (title) => {
    let str = title.replace(/\s/g, "-");
    goto(str);
  };

  // sorted according to date
  const convertToDate = (dateString) => new Date(dateString);
  let sortedBlogs = data.slice().sort((a, b) => {
    return convertToDate(b.dt) - convertToDate(a.dt);
  });

  function formatDate(date) {
    let dt = new Date(date);
    let day = dt.getDate();
    let monthName = dt.toLocaleString("default", { month: "long" });
    let year = dt.getFullYear();
    let formattedDay = day < 10 ? "0" + day : day;
    return `${monthName} ${formattedDay}, ${year}`;
  }
</script>

<section class="w-11/12 mx-auto">
  <h2 class="text-center font-semibold text-2xl mt-4 mb-8">
    Home Page of Blogs
  </h2>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20"
  >
    {#each sortedBlogs as dt (dt._id)}
      <div
        class="bg-white rounded-xl shadow-md overflow-hidden"
        on:click={() => detailView(dt.title)}
        key={dt._id}
      >
        <div class="relative">
          {#if dt.img}
            <img
              class="w-full h-48 object-cover"
              src={dt.img}
              alt="cover_img"
            />
          {/if}
        </div>
        <div class="p-4">
          <div class="text-lg font-medium text-gray-800 mb-2">
            {#if dt.title}
              {dt.title}
            {/if}
          </div>
          <div class="flex items-center gap-4">
            {#if dt.authImg}
              <img
                src={dt.authImg}
                alt="auth_img"
                class="w-8 h-8 rounded-full object-cover"
              />
            {/if}
            {#if dt.authName}
              <p class="font-semibold text-sm">{dt.authName}</p>
            {/if}
          </div>
          <div>
            <div>
              {#if dt.dt}
                <p class="opacity-80 text-xs">
                  <span class="font-semibold">Posted On:</span>
                  {formatDate(dt.dt)}
                </p>
              {/if}
            </div>
            {#if dt.updatedDt != ""}
              <p class="opacity-80 text-xs">
                <span class="font-semibold">Updated On:</span>
                {formatDate(dt.updatedDt)}
              </p>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
