<script>
  export let data;
  let extractData = JSON.parse(data.allData);
  console.log(typeof extractData);

  let authName;
  let authImg;
  let authAltVal;
  extractData.map((item) => {
    // console.log(item.authName);
    authName = item.authName;
    authImg = item.authImg;
    authAltVal = item.authAlt;
  });

  let src;
  function uploadAuthImg(e) {
    const [file] = imgInp.files;
    if (file) {
      let img = URL.createObjectURL(file);
      src = img;
    }
  }
  let authAlt = "";

  function confirmDelete() {
    if (confirm("Are you sure you want to delete this post?")) {
      // If confirmed, submit the form
      document.querySelector('form[action="?/removeAuth"]').submit();
    } else {
      event.preventDefault();
    }
  }
</script>

<section class="ml-[40rem] mt-4 flex flex-col gap-4">
  <h1 class="font-bold text-2xl">Author List</h1>
  <form
    class="flex justify-between mt-4 w-6/12 items-center"
    action="?/addAuth"
    method="POST"
    enctype="multipart/form-data"
  >
    <div class="flex flex-col gap-2 items-center">
      {#if !src}
        <img alt={authAlt} class="border w-full h-[15rem] rounded-md" />
      {:else}
        <img {src} alt="" class="border w-full rounded-md" />
      {/if}

      <input
        id="imgInp"
        type="file"
        name="authImg"
        on:change={uploadAuthImg}
        accept="image/*"
      />
      <input
        type="text"
        name="authAlt"
        placeholder="Enyter Author Alt Name"
        class="border border-green-300 caret-green-400 px-2 py-1 outline-none rounded-md w-full"
      />
      <input
        type="text"
        name="authName"
        value=""
        placeholder="Enter New Author Name"
        class="border border-green-300 caret-green-400 px-2 py-1 outline-none rounded-md w-full"
      />
      <button
        type="submit"
        class="bg-green-400 px-3 py-1 text-white rounded-md hover:bg-green-500 transition-all delay-100"
        >Add Tag</button
      >
    </div>
  </form>
</section>

<div class="ml-[28rem] mt-[4rem]">
  <table>
    <tr>
      <th>Image</th>
      <th>Author Name</th>
      <th>Alt Image</th>
      <th>Action</th>
    </tr>

    {#each extractData as data}
      <tr>
        <td>
          {data._id}
          <img
            src={data.authImg}
            class="w-[4rem] h-[4rem] rounded-full"
            alt=""
          />
        </td>
        <td>
          {#if data.authName}
            <p class="font-semibold tracking-wider">{data.authName}</p>
          {/if}</td
        >
        <td
          >{#if data.authAlt}
            <p class="font-semibold tracking-wider">{data.authAlt}</p>
          {/if}</td
        >

        <td id="trash">
          <form action="?/removeAuth" method="POST" on:submit={confirmDelete}>
            <input
              type="text"
              class="hidden"
              bind:value={data._id}
              name="dataId"
            /><button type="submit" class="hover:text-red-500">
              <i class="fa-solid fa-trash"></i>
            </button>
          </form></td
        >
      </tr>
    {/each}
  </table>
</div>

<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 80%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #66bb6a;
  }
  #trash {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 2rem;
    color: orange;
  }
</style>
