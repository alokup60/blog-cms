<script>
  import "../../app.css";
  import SideBar from "../components/SideBar.svelte";
</script>

<div class="flex">
  <div>
    <SideBar />
  </div>

  <main>
    <slot />
  </main>
</div>
