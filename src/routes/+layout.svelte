<script>
  import "../app.css";
  import Header from "./Header.svelte";
  import SideBar from "./components/SideBar.svelte";
  import { ToastContainer } from "svelte-toasts";
  import { page } from "$app/stores";
</script>

<div>
  <!-- <ToastContainer /> -->
  <!-- <Header /> -->
  <!-- <SideBar /> -->
  <main>
    <slot />
  </main>

  <!-- <footer>This is a footer</footer> -->
</div>
