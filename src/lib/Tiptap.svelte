<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Heading from "@tiptap/extension-bold";
  import Paragraph from "@tiptap/extension-bold";

  let element;
  let editor;
  let content;
  onMount(() => {
    editor = new Editor({
      editorProps: {
        attributes: {
          class: " h-[300px] border-2  m-10 bg-gray-50",
        },
      },
      element: element,
      extensions: [StarterKit],
      content: "<div></div>",
      //     Paragraph.configure({
      //     HTMLAttributes: {
      //       class: 'my-custom-paragraph',
      //     },
      //   }),

      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
        const html = editor.getHTML();
        content = html;

        // console.log(html);
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

{#if editor}
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    class:active={editor.isActive("heading", { level: 1 })}
  >
    H1
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive("heading", { level: 2 })}
  >
    H2
  </button>
  <button
    on:click={() => editor.chain().focus().setParagraph().run()}
    class:active={editor.isActive("paragraph")}
  >
    P
  </button>
{/if}

<div bind:this={element} />
<textarea
  class="border-2 m-10"
  name="html"
  id="html"
  cols="160"
  rows="5"
  bind:value={content}
></textarea>
{@html content}

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
