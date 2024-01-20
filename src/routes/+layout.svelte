<script>
  import Header from "./Header.svelte";
  import "../app.css";
</script>

<div>
  <!-- <ToastContainer /> -->
  <Header />
  <!-- <SideBar /> -->
  <main>
    <slot />
  </main>

  <!-- <footer>This is a footer</footer> -->
</div>
