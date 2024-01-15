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

          <div
            class="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md"
          >
            New
          </div>
          <div
            class="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs"
          >
            3 min read
          </div>
        </div>
        <div class="p-4">
          <div class="text-lg font-medium text-gray-800 mb-2">
            {#if dt.title}
              {dt.title}
            {/if}
          </div>
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
            <div class="">
              {#if dt.dt}
                <p class="opacity-80 text-xs">
                  <span class="font-semibold">Posted On:</span>
                  {formatDate(dt.dt)}
                </p>
              {/if}

              {#if dt.updatedDt == null && dt.updatedDt == undefined && dt.updatedDt == ""}
                <p class="opacity-80 text-xs">
                  <span class="font-semibold">Updated On:</span>
                  {formatDate(dt.updatedDt)}
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
