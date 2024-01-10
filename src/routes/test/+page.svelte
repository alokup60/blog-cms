<script>
  import { flip } from "svelte/animate";
  // import { blogForm } from "$lib/store/stores";
  export let data;
  let newdata = JSON.parse(data.header);
  const dragDuration = 300;
  // let arr = $blogForm;
  let cards = [];
  newdata.forEach((element, i) => {
    cards.push(element);
    console.log(i + 1);
  });

  let draggingCard;
  let animatingCards = new Set();

  function swapWith(card) {
    if (draggingCard === card || animatingCards.has(card)) return;
    animatingCards.add(card);
    setTimeout(() => animatingCards.delete(card), dragDuration);
    const cardAIndex = cards.indexOf(draggingCard);
    const cardBIndex = cards.indexOf(card);
    console.log(cardAIndex, "A");
    console.log(cardBIndex, "B");
    cards[cardAIndex] = card;
    cards[cardBIndex] = draggingCard;
  }
</script>

<section class="w-11/12 flex mx-auto flex-wrap flex-col">
  <h2 class="text-center font-semibold text-2xl">Home Page of Blogs</h2>
  <div class="w-full flex mx-auto mt-4 flex-wrap gap-4">
    {#each cards as card (card)}
      <button
        class="flex border px-4 py-2 rounded-md w-[30%] min-h-[20rem] hover:bg-gray-100 cursor-pointer"
        key={data._id}
        on:click={() => detailView(data.title)}
        animate:flip={{ duration: dragDuration }}
        draggable="true"
        on:dragstart={() => (draggingCard = card)}
        on:dragend={() => (draggingCard = undefined)}
        on:dragenter={() => swapWith(card)}
        on:dragover|preventDefault
      >
        <div class="flex justify-between flex-col">
          <div>
            <img src={card.img} alt="cover_img" class="rounded-md" />
          </div>
          <hr class="mt-2" />
          <div>
            <p class="font-semibold text-xl tracking-wider">{card.title}</p>
          </div>

          <div class="flex">
            <div class="flex gap-4">
              <img
                src={card.authImg}
                alt="auth_img"
                class="w-[45px] rounded-full object-cover h-[45px]"
              />
              <div>
                <p>{card.auth}</p>

                <p class="opacity-80">{card.dt}</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    {/each}
  </div>
</section>

<style>
  .container {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
  }
</style>
