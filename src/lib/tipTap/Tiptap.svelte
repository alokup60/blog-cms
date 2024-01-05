<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Bold from "@tiptap/extension-bold";
  import Blockquote from "@tiptap/extension-blockquote";
  import BulletList from "@tiptap/extension-bullet-list";
  import Code from "@tiptap/extension-code";

  let element;
  let editor;
  let newdata;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Bold, Blockquote, BulletList, Code],
      content: "<p>Hello World! 🌍️ </p>",
      editorProps: {
        attributes: {
          class:
            "prose prose-sm px-2 sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border h-[16rem] overflow-y-auto",
        },
      },
      onTransaction: () => {
        newdata = editor.getHTML();
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
  <div class="border flex gap-2 px-2 py-2">
    <select
      class="outline-none border-2 rounded-md border-r-2 px-2 border-green-300"
      on:change={() => {
        const selectedLevel = parseInt(event.target.value, 10);
        editor.chain().focus().toggleHeading({ level: selectedLevel }).run();
      }}
    >
      {#each [1, 2, 3, 4, 5, 6] as level}
        <option
          value={level}
          class={editor && editor.isActive("heading", { level })
            ? "selected"
            : ""}>H{level}</option
        >
      {/each}
    </select>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleBold().run()}
      class={`${
        editor.isActive("bold") ? "is-active" : ""
      } border-r-2 border-l-2 px-2 border-green-300`}
    >
      <abbr title="ctrt+B">Bold</abbr>
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleBlockquote().run()}
      class={`${
        editor.isActive("blockquote") ? "is-active" : ""
      } border-r-2 px-2 border-green-300`}
    >
      <abbr title="ctrl+shift+B">Blockquote</abbr>
    </button>

    <button
      on:click={() => editor.chain().focus().toggleBulletList().run()}
      class={`${
        editor.isActive("bulletList") ? "is-active" : ""
      }border-r-2 px-2 border-green-300`}
    >
      BulletList
    </button>

    <button
      on:click={() => editor.chain().focus().toggleCode().run()}
      class={`${
        editor.isActive("code") ? "is-active" : ""
      } border-r-2 px-2 border-green-300`}
    >
      <abbr title="ctrl+E">Code</abbr>
    </button>
  </div>
{/if}

<div bind:this={element} class="h-72" />
{#if newdata}
  <textarea
    name="content"
    bind:value={newdata}
    class="w-full border h-[10rem] outline-none resize-none"
  />
{/if}

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
