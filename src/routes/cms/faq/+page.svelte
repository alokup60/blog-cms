<script>
  import { onMount } from "svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import Accordian from "../../components/Accordian.svelte";
  export let data;
  export let form;

  // console.log(data.htmldata);
  let tags = JSON.parse(data.tagData);
  // console.log(tags);

  //toast
  const showToast = () => {
    const toast = toasts.add({
      title: "Success",
      description: "Author Added successfully",
      duration: 3000,
      placement: "center",
      type: "info",
      theme: "dark",
      placement: "center",
      showProgress: true,
      type: "success",
      theme: "dark",
      onClick: () => {},
      onRemove: () => {},
    });
  };

  let question = "";
  let answer = "";
  let tag = [];

  function addTags(e) {
    let val = e.target.value;
    tag = [...tag, val];
  }
  onMount(async () => {
    if (form?.success) {
      showToast();
    }
  });
</script>

<section class="flex flex-col mt-[4rem] ml-[5rem] w-full">
  <h1 class="ml-[40rem] font-semibold text-2xl text-green-500 tracking-widest">
    FAQ
  </h1>
  <form method="POST">
    <div class="w-full ml-[12rem]">
      <div class="ml-[6rem] flex flex-col justify-between mx-auto w-full">
        <label for="question" class="text-green-500 font-semibold text-md"
          >Question</label
        >
        <input
          type="text"
          name="question"
          id="question"
          placeholder="Write your Question here ?"
          bind:value={question}
          class="border border-green-300 px-2 py-1 rounded-md w-full outline-none caret-green-400"
        />
      </div>
      <div class="ml-[6rem] flex flex-col justify-between mx-auto w-full">
        <label for="question" class="text-green-500 font-semibold text-md"
          >Answer</label
        >
        <textarea
          name="answer"
          id="answer"
          rows="15"
          placeholder="Enter your Answer..."
          bind:value={answer}
          class="border border-green-300 px-2 py-1 rounded-md w-full outline-none caret-green-400 resize-none"
        />
      </div>

      <!-- option -->
      <div class="ml-[6rem] flex gap-2 flex-wrap py-4">
        <label for="tags" class="text-green-500 font-semibold text-md"
          >Tags</label
        >

        {#each tags as tag}
          <div class="check">
            <input
              on:change={addTags}
              value={tag}
              id={tag}
              name="tags"
              type="checkbox"
              class={`tag-check bg-gray-400 px-3 py-1 rounded-md text-white text-center cursor-pointer outline-none 
          }`}
            />
            <label for={tag}>{tag}</label>
          </div>
        {/each}
      </div>
      <button
        type="submit"
        class="ml-[30rem] mt-[2rem] bg-green-400 px-4 py-1 rounded-md text-white hover:bg-green-500"
        >Add FAQ</button
      >
    </div>
    <ToastContainer let:data>
      <FlatToast {data} />
    </ToastContainer>
  </form>
</section>

<section>
  <div>
    {#each data.htmldata as item}
      <!-- {JSON.stringify(item.tags)} -->
      <Accordian>
        <span slot="head"> {item.question} </span>
        <div slot="details">
          {@html item.answer}
          {#if item.tags !== undefined}
            {#each item.tags as ite}
              {ite}
            {/each}
          {/if}
        </div>
        <div class=""></div>
      </Accordian>
    {/each}
  </div>
</section>

<style>
  .tag-check {
    display: none;
  }

  .check label {
    background-color: gray;
    padding: 5px 10px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  /* //important to change bg color of label  */
  .check input:checked + label {
    background-color: green;
  }
</style>
