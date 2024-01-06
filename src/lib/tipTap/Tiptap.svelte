<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Bold from "@tiptap/extension-bold";
  import Blockquote from "@tiptap/extension-blockquote";
  import BulletList from "@tiptap/extension-bullet-list";
  import Code from "@tiptap/extension-code";
  import { Color } from "@tiptap/extension-color";
  import FontFamily from "@tiptap/extension-font-family";
  import HorizontalRule from "@tiptap/extension-horizontal-rule";
  import Image from "@tiptap/extension-image";
  import Italic from "@tiptap/extension-italic";
  import Link from "@tiptap/extension-link";
  import OrderedList from "@tiptap/extension-ordered-list";
  import Subscript from "@tiptap/extension-subscript";
  import Superscript from "@tiptap/extension-superscript";
  import TextAlign from "@tiptap/extension-text-align";
  import Underline from "@tiptap/extension-underline";
  // import Mention from "@tiptap/extension-mention";

  let element;
  let editor;
  let newdata;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Bold,
        Blockquote,
        BulletList,
        Code,
        Color,
        FontFamily,
        HorizontalRule,
        Image,
        Italic,
        OrderedList,
        Subscript,
        Superscript,
        Underline,
        Link.configure({
          openOnClick: false,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "right", "center", "justify"],
        }),
      ],
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

  async function encodeHTMLEntities(rawStr) {
    let encodedValue = await btoa(rawStr);
    let decodedValue = await atob(encodedValue);
    console.log(encodedValue, decodedValue);
    // let data = rawStr.replace(
    //   /[\u00A0-\u9999<>\&]/g,
    //   (i) => `&#${i.charCodeAt(0)};`
    // );
    // console.log(data);
  }
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  //image function
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    });

    input.click();
  };

  //link function
  const toggleLink = () => {
    const isActive = editor.isActive("link");

    if (isActive) {
      editor.chain().focus().unsetLink().run();
    } else {
      const previousUrl = editor.getAttributes("link").href;
      const url = prompt("URL", previousUrl);

      // canceled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  //superscript & subscript
  // function changeScript(scriptType) {
  //   if (scriptType === "subscript") {
  //     editor.chain().focus().toggleSubscript().run();
  //   } else if (scriptType === "superscript") {
  //     editor.chain().focus().toggleSuperscript().run();
  //   }
  // }
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
      <abbr title="ctrt+B"><i class="fa-solid fa-bold"></i></abbr>
    </button>
    <button
      on:click={() => editor.chain().focus().toggleItalic().run()}
      class={`${
        editor.isActive("italic") ? "is-active" : ""
      } border-r-2  px-2 border-green-300`}
    >
      <abbr title="ctrt+B"><i class="fa-solid fa-italic"></i></abbr>
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleUnderline().run()}
      class={editor.isActive("underline") ? "is-active" : ""}
    >
      <i class="fa-solid fa-underline"></i>
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleBlockquote().run()}
      class={`${
        editor.isActive("blockquote") ? "is-active" : ""
      } border-r-2 px-2 border-green-300`}
    >
      <abbr title="ctrl+shift+B"><i class="fa-solid fa-quote-left"></i></abbr>
    </button>

    <button
      type="button"
      on:click={() => editor.chain().focus().toggleBulletList().run()}
      class={`${
        editor.isActive("bulletList") ? "is-active" : ""
      }border-r-2 px-2 border-green-300`}
    >
      <i class="fa-solid fa-list"></i>
    </button>

    <button
      type="button"
      on:click={() => editor.chain().focus().toggleSubscript().run()}
      class={editor.isActive("subscript") ? "is-active" : ""}
    >
      <p>S<sub>2</sub></p>
    </button>

    <button
      type="button"
      on:click={() => editor.chain().focus().toggleSuperscript().run()}
      class={editor.isActive("superscript") ? "is-active" : ""}
    >
      <p>S<sup>2</sup></p>
    </button>
    <!-- <select on:change={changeScript(this.value)}>
      <option value="subscript" hidden={editor.isActive("subscript")}
        >Subscript</option
      >
      <option value="superscript" hidden={editor.isActive("superscript")}
        >Superscript</option
      >
    </select> -->
    <!-- <select on:change="changeScript(this.value)">
      <option value="subscript">Subscript</option>
      <option value="superscript">Superscript</option>
    </select> -->

    <button
      type="button"
      on:click={() => editor.chain().focus().toggleOrderedList().run()}
      class={editor.isActive("orderedList") ? "is-active" : ""}
    >
      OrderedList
    </button>

    <button
      on:click={() => editor.chain().focus().toggleCode().run()}
      class={`${
        editor.isActive("code") ? "is-active" : ""
      } border-r-2 px-2 border-green-300`}
    >
      <abbr title="ctrl+E">Code</abbr>
    </button>

    <!-- color is not working yet  -->
    <!-- <select
      class="outline-none border-2 rounded-md border-r-2 px-2 border-green-300 cursor-pointer"
      on:change={(event) => {
        const selectedColor = event.target.value;
        editor.chain().focus().setTextColor(selectedColor).run();
      }}
      value={editor.getAttributes("textStyle").color || ""}
      data-testid="colorOptionMenu"
    >
      <option value="">Color</option>
      <option value="#958DF1">Purple</option>
      <option value="#F98181">Red</option>
      <option value="#FBBC88">Orange</option>
      <option value="#FAF594">Yellow</option>
      <option value="#70CFF8">Blue</option>
      <option value="#94FADB">Teal</option>
      <option value="#B9F18D">Green</option>
    </select> -->

    <!-- font  -->
    <select
      class="outline-none border-2 rounded-md border-r-2 px-2 border-green-300 cursor-pointer"
      on:change={(event) => {
        const selectedFont = event.target.value;
        editor.chain().focus().setFontFamily(selectedFont).run();
      }}
      value={editor.getAttributes("textStyle").fontFamily || ""}
      data-testid="fontFamilyOptionMenu"
    >
      <option value="">Font Family</option>
      <option value="Inter">Inter</option>
      <option value="Comic Sans MS, Comic Sans">Comic Sans</option>
      <option value="serif">serif</option>
      <option value="monospace">monospace</option>
      <option value="cursive">cursive</option>
    </select>

    <!-- hr line  -->
    <button
      type="button"
      on:click={() => editor.chain().focus().setHorizontalRule().run()}
    >
      setHorizontalRule
    </button>

    <!-- image  -->
    <button type="button" on:click={addImage}>setImage</button>
    <button
      type="button"
      on:click={toggleLink}
      class:is-active={editor.isActive("link")}
    >
      {editor.isActive("link") ? "unsetLink" : "setLink"}
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
  <button type="button" on:click={encodeHTMLEntities(newdata)}>convert</button>
{/if}

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
