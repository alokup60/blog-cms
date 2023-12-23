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
</script>

<!-- component -->
<body class="bg-gray-100 bottom-0 top-0 h-full">
  <!-- Headig -->
  <nav
    class="bg-gray-800 p-5 w-full fixed flex items-center justify-between z-10"
  >
    <div>
      <h1 class="text-white text-xl font-semibold">CMS PANEL</h1>
    </div>
  </nav>

  <!-- Nav -->
  <aside class="bg-gray-800 fixed text-white w-64 mt-16 h-full p-4 z-10">
    <nav>
      <ul class="space-y-2">
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <a href="/cms/home">Home</a>
            </div>
          </div>
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <a href="/cms/newBlog">New Post</a>
            </div>
          </div>
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <a href="/cms/viewPost">View Post</a>
            </div>
          </div>
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <a href="/cms/allTags">All Tags</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</body>
