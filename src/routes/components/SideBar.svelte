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
<body class="bg-gray-100 absolute">
  <!-- Headong -->
  <nav class="bg-blue-500 p-4 w-full flex items-center justify-between">
    <div>
      <h1 class="text-white text-xl font-semibold">CMS PANEL</h1>
    </div>
    <div class="flex items-center space-x-4">
      <span class="text-white">Blog</span>
      <i class="fas fa-user-circle text-white text-2xl"></i>
    </div>
  </nav>

  <!-- Nav -->
  <aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <nav>
      <ul class="space-y-2">
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-calendar-alt mr-2"></i>
              <span>Home</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <!-- <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Gestion de citas
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Polizas
              </a>
            </li>
          </ul> -->
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-money-bill-wave mr-2"></i>
              <a href="/cms/newBlog">New Post</a>
            </div>
            <!-- <i class="fas fa-chevron-down text-xs"></i> -->
          </div>
          <!-- <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Tratamientos
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Gastos
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Facturas
              </a>
            </li>
          </ul> -->
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-chart-bar mr-2"></i>
              <span>View Post</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <!-- <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Presupuestos
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Informe médico
              </a>
            </li>
          </ul> -->
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-file-alt mr-2"></i>
              <span>Tag</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <!-- <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Firmas pendientes
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Documentos
              </a>
            </li>
          </ul> -->
        </li>
        <!-- Agrega más enlaces para la navegación lateral -->
      </ul>
    </nav>
  </aside>
</body>
