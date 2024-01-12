<script>
  import "../../app.css";
  import SideBar from "../components/SideBar.svelte";
</script>

<div class="grid">
  <div>
    <SideBar />
  </div>

  <main>
    <slot />
  </main>
</div>
