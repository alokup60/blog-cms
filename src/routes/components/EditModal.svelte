<script>
  //   let modal = true;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let show = true;
  const close = () => {
    dispatch("close");
  };
</script>

{#if show}
  <section class="modal">
    <div class="overlay" on:click={close}></div>
    <h2>Edit Tag</h2>
    <div class="flex justify-between mx-auto items-center">
      <label for="tag">Tag</label>
      <input type="text" value="" name="tag" />
    </div>
    <div class="flex justify-center items-center gap-4 mx-auto">
      <button
        type="button"
        class="bg-green-400 text-white rounded-md px-2 py-1 hover:bg-green-500 transition-all delay-200"
        >Update</button
      >
      <button
        type="button"
        on:click={close}
        class="bg-red-400 text-white rounded-md px-2 py-1 hover:bg-red-500 transition-all delay-200"
        >Close</button
      >
    </div>
  </section>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1;
  }
  .modal {
    /* position: absolute; */
    z-index: 2;
  }
</style>
