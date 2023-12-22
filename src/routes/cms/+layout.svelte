<script>
  import "../../app.css";
  import SideBar from "../components/SideBar.svelte";
</script>

<div>
  <!-- <ToastContainer /> -->
  <!-- <Header /> -->
  <SideBar />
  <main>
    <slot />
  </main>

  <!-- <footer>This is a footer</footer> -->
</div>
