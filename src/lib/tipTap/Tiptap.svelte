<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Bold from "@tiptap/extension-bold";

  let element;
  let editor;
  let newdata;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Bold],
      content: "<p>Hello World!  🌍️ </p>",
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
        newdata = editor.getHTML();
        // let data = document.getElementById("demo");

        // data.innerText += newdata;

        // data = newdata;
      },
    });
    // let data =
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

{#if editor}
  <button
    on:click={() => editor.chain().focus().setBold().run()}
    disabled={editor.isActive("bold")}
  >
    setBold
  </button>
  <button
    type="button"
    on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    class:active={editor.isActive("heading", { level: 1 })}
  >
    H1
  </button>
  <button
    type="button"
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive("heading", { level: 2 })}
  >
    H2
  </button>
  <button
    type="button"
    on:click={() => editor.chain().focus().setParagraph().run()}
    class:active={editor.isActive("paragraph")}
  >
    P
  </button>
{/if}

<div bind:this={element} class="h-72" />
{#if newdata}
  <textarea name="content" bind:value={newdata} />
{/if}

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
