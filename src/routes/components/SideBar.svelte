<script>
  import { browser } from "$app/environment";

  if (browser) {
    document.addEventListener("DOMContentLoaded", function () {
      // Obtener todas las opciones principales con desplegables
      const opcionesConDesplegable = document.querySelectorAll(
        ".opcion-con-desplegable"
      );

      // Agregar evento de clic a cada opción principal
      opcionesConDesplegable.forEach(function (opcion) {
        opcion.addEventListener("click", function () {
          // Obtener el desplegable asociado a la opción
          const desplegable = opcion.querySelector(".desplegable");

          // Alternar la clase "hidden" para mostrar u ocultar el desplegable
          desplegable.classList.toggle("hidden");
        });
      });
    });
  }
  // let listItems = document.querySelectorAll("#list-items li");
  // listItems.forEach(function (item) {
  //   item.addEventListener("click", function () {
  //     listItems.forEach(function (li) {
  //       li.classList.remove("active");
  //     });

  //     item.classList.add("active");
  //   });
  // });
</script>

<!-- Nav -->
<aside class="bg-gray-800 w-60 text-white h-screen overflow-hidden">
  <nav class="flex flex-col gap-2 w-full">
    <div class="px-2 py-4 bg-green-400">
      <p class="font-bold">BLOG CMS</p>
    </div>
    <ul class="space-y-2 w-full" id="list-items">
      <li class="flex items-center justify-between p-2 hover:bg-gray-700">
        <a href="/cms/home" class="w-full">Home</a>
      </li>

      <li class="flex items-center justify-between p-2 hover:bg-gray-700">
        <a href="/cms/newBlog" class="w-full">New Blog</a>
      </li>

      <li class="flex items-center justify-between p-2 hover:bg-gray-700">
        <a href="/cms/viewPost" class="w-full">View Post</a>
      </li>

      <li class="flex items-center justify-between p-2 hover:bg-gray-700">
        <a href="/cms/allTags" class="w-full">All Tags</a>
      </li>
    </ul>
  </nav>
</aside>

<style>
  .active {
    background-color: green;
  }
</style>
