<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  export let open = false;

  const clickHandler = () => (open = !open);

  let border;

  onMount(() => {
    border = document.getElementById("header");
  });

  $: {
    if (border) {
      if (!open) {
        border.classList.add("borderB");
      } else {
        border.classList.remove("borderB");
      }
    }
  }
</script>

<div class="flex flex-col w-full ml-[4rem]">
  <!-- this is header  -->
  <button on:click={clickHandler}>
    <div class={` ml-[4rem] py-4`} id="header">
      <div class="text">
        <slot name="head" />
        {#if !open}
          <i class="fa-solid fa-arrow-down"></i>
        {:else}
          <i class="fa-solid fa-arrow-up"></i>
        {/if}
      </div>
    </div>
  </button>

  <!-- this is details  -->
  {#if open}
    <div
      class="details flex border-b borderB pb-4 w-full ml-[6rem]"
      transition:slide
    >
      <slot name="details" />
    </div>
  {/if}
</div>

<style>
  .borderB {
    border-bottom: 2px solid black;
  }
</style>
