<template>
  <div class="contenedor">
    <div class="encabezado">
      <Titulo texto="Empleados" />
      <p class="subtitulo">Gestion de los Empleados</p>
    </div>

    <div class="acciones-header">
      <button class="btn-nuevo" @click="emitirNuevoEmpleado">
        <i class="fas fa-plus-circle"></i>
        Nuevo Empleado
      </button>
    </div>

    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <span>Cargando empleados...</span>
    </div>

    <div v-else class="grid">
      <FichaEmpleado
        v-for="emp in empleados"
        :key="emp.dni"
        :empleado="emp"
        @ver-detalles="manejarVerDetalles"
      />
    </div>

    <Transition name="modal-fade">
      <div v-if="mostrarModalExito" class="modal-overlay">
        <div class="modal-exito">
          <div class="modal-header-exito">
            <i class="fas fa-check-circle"></i>
            <h3>¡Éxito!</h3>
          </div>
          <div class="modal-body-exito">
            <p>{{ mensajeModalExito }}</p>
          </div>
          <div class="modal-footer-exito">
            <button class="btn-modal-continuar" @click="handleContinuarExito">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </Transition>
    
    <Transition name="modal-fade">
      <div v-if="mostrarModalError" class="modal-overlay">
        <div class="modal-error"> 
          <div class="modal-header-error">
            <i class="fas fa-exclamation-triangle"></i> 
            <h3>Error</h3>
          </div>
          <div class="modal-body-error">
            <p>{{ mensajeModalError }}</p> 
          </div>
          <div class="modal-footer-error">
            <button class="btn-modal-error" @click="handleContinuarError">
              Entendido
            </button>
          </div>
        </div>
      </div>
    </Transition>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Titulo from '../../Titulo.vue';
// Importamos el nuevo componente de ficha
import FichaEmpleado from './FichaEmpleado.vue'; 

// --- Estados del Componente ---
const loading = ref(true);
const empleados = ref([]);

// --- Estados de Modales (copiados de tus ejemplos) ---
const mostrarModalExito = ref(false);
const mensajeModalExito = ref('');
const mostrarModalError = ref(false);
const mensajeModalError = ref('');

// --- Definición de Eventos a Emitir al Padre (PantallaAdmin.vue) ---
const emit = defineEmits([
  'ver-empleado-seleccionado', // Evento para ver detalles
  'NuevoEmpleado'              // Evento para crear uno nuevo
]);

// --- Carga de Datos (Simulada) ---
const cargarEmpleados = async () => {
  loading.value = true;
  try {
    // Simulamos una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Usamos los datos de tu imagen y tu JSON de ejemplo
    empleados.value = [
      { "dni": "37493123", "nombre": "Jose", "apellido": "Coria", "rol": "Entrenador" },
      { "dni": "45162728", "nombre": "Leandro Manuel", "apellido": "Rios", "rol": "Entrenador" },
      { "dni": "44555667", "nombre": "Nicolas", "apellido": "Gimenez", "rol": "Entrenador" },
      { "dni": "31222333", "nombre": "Maria", "apellido": "Gomez", "rol": "Administrativa" },
      { "dni": "43444556", "nombre": "Camila", "apellido": "Herrera", "rol": "Entrenador" }
    ];

  } catch (error) {
    console.error("Error al cargar empleados:", error);
    mensajeModalError.value = "No se pudieron cargar los empleados. Intente más tarde.";
    mostrarModalError.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(cargarEmpleados);

// --- Manejadores de Eventos ---

/**
 * Recibe el evento de la ficha, guarda la data en 'EmpleadoSeleccionado'
 * y la emite al componente padre (PantallaAdmin.vue).
 */
const manejarVerDetalles = (empleado) => {
  // 1. Guardamos la estructura en la variable que pediste
  const EmpleadoSeleccionado = empleado;
  
  console.log('Empleado seleccionado en Empleados.vue:', EmpleadoSeleccionado);

  // 2. =================================================================
  //    == ✨ AQUÍ SE EMITE EL EVENTO AL PADRE (PantallaAdmin.vue) ✨ ==
  //    ==   (Con la estructura del empleado seleccionado)            ==
  //    =================================================================
  emit('ver-empleado-seleccionado', EmpleadoSeleccionado);
};

/**
 * Emite el evento 'NuevoEmpleado' al padre (PantallaAdmin.vue)
 * cuando se presiona el botón.
 */
const emitirNuevoEmpleado = () => {
  // ===================================================================
  // == ✨ AQUÍ SE EMITE EL EVENTO 'NuevoEmpleado' AL PADRE ✨ ==
  // ===================================================================
  emit('NuevoEmpleado');
};

// --- Funciones para cerrar los modales ---
const handleContinuarExito = () => {
  mostrarModalExito.value = false;
};

const handleContinuarError = () => {
  mostrarModalError.value = false;
  // Opcional: podríamos reintentar la carga
  // cargarEmpleados();
};

</script>

<style scoped>
/* Estilos del contenedor principal (ya los tenías) */
.contenedor {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  width: 100%;
  max-width: none;
  margin: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  min-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative; /* Para el loader */
}

.encabezado {
  text-align: center;
  margin-bottom: 2rem;
}

.subtitulo {
  color: #666;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.5px;
}

/* --- Estilos del Botón "Nuevo Empleado" --- */
/* Inspirado en tu imagen */
.acciones-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start; /* Alineado a la izquierda como en la img */
}

.btn-nuevo {
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  border: 2px solid #333; /* Borde negro como en la img */
  color: #333;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-nuevo:hover {
  background-color: #f4f4f4;
  border-color: #e50914; /* Rojo al hacer hover */
  color: #e50914;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* La clase .grid y los estilos de .loading-container 
   se cargan desde tu CSS global, por lo que no es 
   necesario repetirlos aquí. */
</style>