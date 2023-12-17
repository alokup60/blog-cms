<script>
  import { page } from "$app/stores";
</script>

<nav class="flex w-10/12">
  <ul>
    <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
      <a href="/">Home</a>
    </li>
    <li aria-current={$page.url.pathname === "/cms" ? "page" : undefined}>
      <a href="/cms">CMS</a>
    </li>
    <li aria-current={$page.url.pathname === "/contact" ? "page" : undefined}>
      <a href="/contact">Contact</a>
    </li>
  </ul>
</nav>
