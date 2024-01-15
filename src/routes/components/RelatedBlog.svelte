<script>
  import { goto } from "$app/navigation";

  export let rb;

  console.log(rb, "relatedBlog");

  const detailView = (title) => {
    let str = title.replace(/\s/g, "-");
    goto(str);
  };

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
  <div
    id="tss"
    class="w-full flex flex-wrap justify-center gap-2 mx-auto space-x-4 space-y-4"
  >
    {#each rb as dt (dt._id)}
      <div
        class="flex flex-wrap border px-4 py-2 rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-h-[20rem] hover:bg-gray-100 cursor-pointer"
        on:click={() => detailView(dt.title)}
        key={dt._id}
      >
        <div class="flex flex-col w-full">
          {#if dt.img}
            <img src={dt.img} alt="cover_img" class="rounded-md w-full mb-4" />
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
      </div>
    {/each}
  </div>
</section>
