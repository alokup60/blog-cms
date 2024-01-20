<script>
  import { onMount } from "svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import Accordian from "../../components/Accordian.svelte";
  export let data;
  export let form;
  let faq = JSON.parse(data.htmldata);
  let tags = JSON.parse(data.tagData);
  console.log(faq, "faq");

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
  function confirmDelete() {
    if (confirm("Are you sure you want to delete this post?")) {
      document.querySelector('form[action="?/deleteFaq"]').submit();
    } else {
      event.preventDefault();
    }
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
  <form method="POST" action="?/createdFaq">
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
    {#each faq as item}
      <Accordian>
        <span slot="head"> {item.question} </span>
        <div slot="details">
          {@html item.answer}
          {#if item.tags !== undefined}
            {#each item.tags as ite}
              {ite}
            {/each}
          {/if}

          <form method="POST" action="?/deleteFaq" on:submit={confirmDelete}>
            <input
              type="text"
              bind:value={item.id}
              name="faqId"
              class="hidden"
            />
            <button
              type="submit"
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
          </form>

          <!-- <form method="POST" action="?/editFaq">
            <input
              type="text"
              bind:value={item.id}
              name="faqId"
              class="hidden"
            />
            {item.id}

            <a
              href={`${item.id}`}
              class="editBtn text-orange-400 hover:text-orange-700 transition-all duration-200"
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
            </a>
          </form> -->
        </div>
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
