<template>
  <div class="contenedor-info-alumno">
    
    <!-- 1. Encabezado con Botón Volver y Título (como en InfoAlumno) -->
    <div class="encabezado-info">
      <button class="btn-volver-global" @click="emitirVolver">
        <i class="fas fa-arrow-left"></i>
        Volver a Empleados
      </button>
      <Titulo texto="INFORMACIÓN DEL EMPLEADO" />
    </div>

    <!-- 2. Tarjeta principal (como en InfoAlumno) -->
    <div class="tarjeta-alumno">
      <div class="tarjeta-contenido">
        
        <!-- 3. Componente DetallePersona (ahora muestra el ROL) -->
        <DetallePersona :datos="DatosEmpleado" />
        
        <div class="separador-seccion"></div>

        <!-- 4. Componente TablaHorarios (en modo empleado) -->
        <div class="seccion-info">
          <h3 class="titulo-seccion">
            <i class="fas fa-calendar-alt"></i>
            Horarios Laborales Asignados
          </h3>
          <TablaHorarios
            :horarios-alumno="HorariosEmpleado"
            :suscripcion="''" 
            :modo-empleado="true"
            @horarios-actualizados="manejarHorariosActualizados"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Titulo from '../../Titulo.vue';
// Importamos los componentes que vamos a usar
import DetallePersona from '../DetallePersona.vue';
import TablaHorarios from '../../Tablas y Filas/TablaHorario/TablaHorarios.vue';

// --- CÓDIGO ORIGINAL (Como pediste, no se toca) ---
// guardamos los datos del alumno que vino de pantalla admin
const props = defineProps({
  empleadoSeleccionado: {
    type: Object,
    required: true
  }
});
// Lo guardamos en EmpleadoID para luego sacar su identificador y luego boscarlo con la api
const EmpleadoID = ref(props.empleadoSeleccionado);
console.log('Empleado en InfoEmpleado (desde prop):', EmpleadoID.value);
// --- FIN CÓDIGO ORIGINAL ---


// --- Lógica para el botón "Volver" ---
const emit = defineEmits(['volver-empleados']);
const emitirVolver = () => {
  emit('volver-empleados');
}


// --- ESTRUCTURAS DE PRUEBA (Como pediste) ---

// 1. Estructura con los datos del empleado (para DetallePersona)
const DatosEmpleado = ref({
  "dni": "12345678",
  "nombre": "Carlos",
  "apellido": "Rodriguez",
  "sexo": "M",
  "email": "carlos.rodriguez@gimnasio.com",
  "telefono": "3624889900",
  "provincia": "Chaco",
  "localidad": "Resistencia",
  "calle": "Av. Ávalos",
  "nro": "1234",
  "rol": "Entrenador de Musculación" // El campo ROL que se mostrará en el header
});

// 2. Estructura con los horarios del empleado (para TablaHorarios)
const HorariosEmpleado = ref({
  "horarios": [
    { "dia": "Lunes", "nroGrupo": "1 " },
    { "dia": "Martes", "nroGrupo": "1 " },
    { "dia": "Miércoles", "nroGrupo": "1 " }, // Corregida ortografía
    { "dia": "Jueves", "nroGrupo": "1 " },
    { "dia": "Viernes", "nroGrupo": "1 " }
  ]
});

const manejarHorariosActualizados = (nuevosHorarios) => {
  
  // 'nuevosHorarios' tiene el formato: { horarios: [...] }
  console.log("Nuevos horarios recibidos en InfoEmpleado:", nuevosHorarios.horarios);

  // 1. (Opcional) Actualizar la estructura local si es necesario
  HorariosEmpleado.value = nuevosHorarios;
  
  // 2. ===========================================================
  //    ==      TODO: AQUÍ VA LA LLAMADA A LA API                ==
  //    ==      para guardar los nuevos horarios del empleado.     ==
  //    ===========================================================
  //
  //   const dni = EmpleadoID.value.dni;
  //   try {
  //     await api.actualizarHorariosEmpleado(dni, nuevosHorarios.horarios);
  //     // Opcional: mostrar modal de éxito
  //     // mostrarModalExito("Horarios actualizados con éxito");
  //   } catch (error) {
  //     // Opcional: mostrar modal de error
  //     // mostrarModalError("No se pudieron guardar los horarios");
  //   }
  //
};
// ===================================================================
</script>

<style scoped>
/* Estilos copiados de InfoAlumno.vue para mantener la coherencia */
.contenedor-info-alumno {
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
  position: relative;
}

.encabezado-info {
  display: grid; 
  grid-template-columns: 1fr auto 1fr; 
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap; 
  gap: 1rem;
}
.encabezado-info .btn-volver-global {
  justify-self: start; 
}

.tarjeta-alumno {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tarjeta-contenido {
  padding: 0; /* DetallePersona ya tiene su propio padding/header */
}

.separador-seccion {
  height: 1px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  margin: 2rem 2rem; 
}

.seccion-info {
  margin-bottom: 2.5rem;
  padding: 1.5rem 2rem;
  background: #fafafa;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  margin-left: 2rem;
  margin-right: 2rem;
}
.seccion-info .titulo-seccion {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #d32f2f;
  padding-bottom: 0.5rem;
}
.seccion-info .titulo-seccion i { color: #d32f2f; }

.seccion-info:last-child {
  margin-bottom: 0;
  padding-bottom: 2rem; /* Añadimos padding al final */
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .contenedor-info-alumno { 
    padding: 1rem;
  } 

  .encabezado-info {
    display: flex; 
    flex-direction: column;
    text-align: center;
    align-items: stretch;
    grid-template-columns: none; 
  }
  .encabezado-info .btn-volver-global {
    justify-content: center;
    margin-bottom: 1rem;
    justify-self: auto;
  }

  .tarjeta-contenido { 
    padding: 1rem;
  }

  .separador-seccion { 
    margin: 1.5rem 0; 
  }

  .seccion-info { 
    padding: 1rem 0; 
    border: none;
    background: none; 
    margin-left: 0;
    margin-right: 0;
  }

  .seccion-info .titulo-seccion {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  .contenedor-info-alumno { 
    padding: 0.5rem;
  } 

  .tarjeta-contenido { 
    padding: 0.5rem;
  }

  .separador-seccion { 
    margin: 1rem 0; 
  }

  .seccion-info { 
    padding: 0.8rem 0; 
  }

  .seccion-info .titulo-seccion {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>