<script>
  import { goto } from "$app/navigation";

  export let data;
  // console.log(data, "from BlogCard");

  const detailView = (title) => {
    let str = title.replace(/\s/g, "-");
    console.log(str);
    goto(str);
  };

  // sorted according to date
  const convertToDate = (dateString) => new Date(dateString);
  let sortedBlogs = data.slice().sort((a, b) => {
    return convertToDate(b.dt) - convertToDate(a.dt);
  });

  //display the date
  // let postedDate;
  // let postAt;
  // data.map((item) => {
  //   postedDate = item.dt;
  //   postAt = formatDate(postedDate);
  //   console.log(postAt, "extracted date");
  // });
  // postedDate = new Date().toISOString().split("T")[0];

  // function formatDate(date) {
  //   let dt = new Date(date[0]);
  //   let day = dt.getDate();
  //   let monthName = dt.toLocaleString("default", { month: "long" });
  //   let year = dt.getFullYear();
  //   let formattedDay = day < 10 ? "0" + day : day;
  //   return `${monthName} ${formattedDay}, ${year}`;
  // }

  // console.log(postAt, "formatted data");
</script>

<section class="w-11/12 flex mx-auto flex-wrap flex-col">
  <h2 class="text-center font-semibold text-2xl">Home Page of Blogs</h2>
  <div class="w-full flex mx-auto mt-4 flex-wrap gap-4">
    {#each sortedBlogs as dt (dt._id)}
      <div
        draggable="true"
        on:click={() => detailView(dt.title)}
        class="flex border px-4 py-2 rounded-md w-[30%] min-h-[20rem] hover:bg-gray-100 cursor-pointer"
        key={dt._id}
      >
        <div class="flex justify-between flex-col flex-wrap">
          {#if dt.img}
            <div>
              <img src={dt.img} alt="cover_img" class="rounded-md" />
            </div>
          {/if}
          <hr class="mt-2" />
          {#if dt.title}
            <div>
              <p class="font-semibold text-xl tracking-wider">{dt.title}</p>
            </div>
          {/if}

          <div class="flex">
            <div class="flex gap-4">
              {#if dt.authImg}
                <img
                  src={dt.authImg}
                  alt="auth_img"
                  class="w-[45px] rounded-full object-cover h-[45px]"
                />
              {/if}
              <div>
                {#if dt.auth}
                  <p class="font-semibold">{dt.auth}</p>
                {/if}
                <div
                  class="flex flex-col justify-between w-full mx-auto flex-wrap"
                >
                  {#if dt.dt}
                    <p class="opacity-80 text-sm">
                      <span class="font-semibold">Posted On:</span>
                      {dt.dt}
                    </p>
                  {/if}

                  {#if dt.updatedDt instanceof Date && !isNaN(dt.updatedDt)}
                    <p class="opacity-80 text-sm">
                      <span class="font-semibold">Updated On:</span>
                      {dt.updatedDt}
                    </p>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
