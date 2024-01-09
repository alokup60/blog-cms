<script>
  //   import Tiptap from "$lib/Tiptap.svelte";
  // import { onMount, onDestroy } from "svelte";
  import "../../app.css";
  //   import { writable } from "svelte/store";

  let prev = "";
  export let form;
  export let data;

  //   let tiptapElement;
  //   let editor;
  //   let content = writable("<p>Hello World! 🌍️ </p>");
  //   let newdata = "";

  //   onMount(async () => {
  //     // Initialize the editor after the component is mounted
  //     editor = new Tiptap({
  //       target: tiptapElement,
  //       props: {
  //         content: $content,
  //       },
  //     });

  // Wait for the editor to be fully initialized
  //     await editor.$on("ready");

  //     // Now, the editor is ready to use, and you can call getHTML safely
  //     newdata = editor.getHTML();
  //   });

  //   onDestroy(() => {
  //     if (editor) {
  //       editor.destroy();
  //     }
  //   });

  //   const saveToDatabase = async () => {
  //     const formData = new FormData();
  //     formData.append("htmlContent", $content);

  //     try {
  //       const response = await fetch("/api/save", {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         console.log("Data saved successfully.");
  //       } else {
  //         console.error("Failed to save data.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
</script>

{@html data.htmldata}
<section>
  <textarea
    cols="60"
    rows="20"
    id="content"
    bind:value={prev}
    name="content"
    class="border-2 border-black outline-none w-10/12 flex justify-center mx-auto"
    contenteditable
  ></textarea>
</section>

{@html prev}
