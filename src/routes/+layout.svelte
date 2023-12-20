<script>
  import "../app.css";
  import Header from "./Header.svelte";
  import { ToastContainer } from "svelte-toasts";
</script>

<div>
  <!-- <ToastContainer /> -->
  <Header />

  <main>
    <slot />
  </main>

  <!-- <footer>This is a footer</footer> -->
</div>
