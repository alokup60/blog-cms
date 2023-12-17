<script>
  import "../app.css";
  import Header from "./Header.svelte";
</script>

<div>
  <Header />

  <main>
    <slot />
  </main>

  <footer>This is a footer</footer>
</div>
