export function TeamLeader_retosView() {
  return `
    <section class="space-y-6 p-4">
      <h1 class="text-2xl md:text-3xl font-bold">ADMINISTRAR RETOS</h1>
      
      <!-- Create / Edit Challenge Form -->
      <form id="challenge-form" class="space-y-4 bg-white shadow-md rounded-xl p-4 border">
        <h2 class="text-xl font-semibold">Crear / Editar Reto</h2>
        
        <div>
          <label class="block text-sm font-medium">Título</label>
          <input type="text" id="challenge-title" class="w-full border rounded-md p-2" placeholder="Ej: Algoritmos de búsqueda" required />
        </div>

        <div>
          <label class="block text-sm font-medium">Descripción</label>
          <textarea id="challenge-description" class="w-full border rounded-md p-2" rows="4" placeholder="Explica el reto aquí..." required></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium">Dificultad</label>
            <select id="challenge-difficulty" class="w-full border rounded-md p-2" required>
              <option value="">Seleccione dificultad</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium">Fecha Límite</label>
            <input type="date" id="challenge-deadline" class="w-full border rounded-md p-2" />
          </div>
        </div>

        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
          Guardar Reto
        </button>
      </form>

      <!-- Challenges List -->
      <div id="challenges-list" class="space-y-6">
        <h2 class="text-xl font-semibold">Retos Publicados</h2>
        <!-- Dynamic challenges will be rendered here by the controller -->
      </div>
    </section>
  `;
}