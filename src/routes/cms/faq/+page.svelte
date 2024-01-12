<script>
  import Accordian from "../../components/Accordian.svelte";
  export let data;
  let parseData = JSON.parse(data.newFaq);
  let answers = JSON.parse(data.body);

  let question = "";
  let answer;
</script>

<section class="flex flex-col mt-[4rem] ml-[5rem] w-full">
  <!-- <Accordian>
    <span slot="head"
      >Question 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Fugiat, amet.
    </span>
    <div slot="details">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit id
        obcaecati ex nesciunt eum, accusamus ducimus doloremque officiis
        necessitatibus fuga.
      </p>
    </div>
  </Accordian> -->
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
      <button
        type="submit"
        class="ml-[30rem] mt-[2rem] bg-green-400 px-4 py-1 rounded-md text-white hover:bg-green-500"
        >Add FAQ</button
      >
    </div>
  </form>
</section>
<section class="flex flex-col mt-[4rem] ml-[5rem] w-full">
  <div>
    {#each parseData as data}
      <p class="ml-[20rem]">Question: {data.question}</p>
    {/each}
  </div>
  <div>
    {#each answers as data}
      <p class="ml-[20rem]">Answer: {@html data}</p>
    {/each}
  </div>
</section>
