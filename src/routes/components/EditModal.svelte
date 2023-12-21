<script>
  export let showModal; // boolean
  let dialog; // HTMLDialogElement
  $: if (dialog && showModal) dialog.showModal();
  function updateTag() {
    console.log("hii");
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click|stopPropagation
    class="w-[20rem] h-[10rem] flex flex-col justify-between"
  >
    <slot name="header" />
    <slot />
    <hr />
    <!-- svelte-ignore a11y-autofocus -->
    <div class="flex justify-center items-center gap-4">
      <button
        autofocus
        on:click={() => dialog.close()}
        class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-400 transition-all delay-200"
        >Close</button
      >
      <button
        on:click={() => updateTag}
        class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-400 transition-all delay-200"
      >
        Update
      </button>
    </div>
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
