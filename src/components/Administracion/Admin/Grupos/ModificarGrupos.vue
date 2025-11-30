<template>
  <div class="contenedor">
    <div class="encabezado">
      <Titulo texto="MODIFICAR GRUPOS" />
      <p class="subtitulo">Gestiona y cambia los horarios de los grupos y días</p>
    </div>

    <div class="acciones-globales">
      <button class="btn-anadir" @click="anadirNuevoGrupo">
        <i class="fas fa-plus-circle"></i> 
        Añadir grupo
      </button>
    </div>

    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <span>Cargando grupos...</span>
    </div>

    <div v-else class="lista-grupos" ref="listaGruposRef">
      <FilaModificarGrupo
        v-for="grupo in grupos"
        :key="grupo.nroGrupo"
        :grupo="grupo"
        @guardar-grupo="manejarGuardarGrupo"
        @eliminar-grupo="manejarEliminarGrupo"
      />
    </div>

    <Transition name="modal-fade">
      <div v-if="mostrarModalConfirmacion" class="modal-overlay">
        <div class="modal-confirmacion" style="border-top: 5px solid #F44336;"> 
          <div class="modal-header">
            <i class="fas fa-exclamation-triangle" style="color: #F44336;"></i>
            <h3>Eliminar Grupo</h3>
          </div>
          
          <div class="modal-body">
            <p>{{ mensajeModalConfirmacion }}</p>
          </div>
          
          <div class="modal-footer">
            <button class="btn-modal btn-cancelar-modal" @click="mostrarModalConfirmacion = false">
              Cancelar
            </button>
            <button 
              class="btn-modal" 
              :class="estiloBotonConfirmar === 'btn-confirmar-peligro' ? 'btn-cancelar-modal' : 'btn-confirmar-modal'"
              :style="estiloBotonConfirmar === 'btn-confirmar-peligro' ? 'background-color: #F44336; color: white;' : ''"
              @click="confirmarEliminacion"
            >
              Sí, Confirmar
            </button>
          </div>
        </div>
      </div>
    </Transition>

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
        <div class="modal-error"> <div class="modal-header-error">
            <i class="fas fa-exclamation-triangle"></i> <h3>Error</h3>
          </div>
          <div class="modal-body-error">
            <p>{{ mensajeModalError }}</p> </div>
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
import { ref, onMounted, nextTick } from 'vue'
import Titulo from '../../Titulo.vue';
import FilaModificarGrupo from './FilaModificarGrupo.vue'; 
const listaGruposRef = ref(null)
const grupos = ref([])
const loading = ref(true)

// ----- Refs para los Modales -----
const mostrarModalExito = ref(false);
const mensajeModalExito = ref('');
const mostrarModalError = ref(false);
const mensajeModalError = ref('');

// --- NUEVOS REFS PARA CONFIRMACIÓN ---
const mostrarModalConfirmacion = ref(false);
const mensajeModalConfirmacion = ref('');
const grupoPendienteEliminar = ref(null); // Variable temporal

import {
  obtenerHorariosCompletos,
  eliminarHorarioGrupo,
  crearHorarioGrupo,
  actualizarHorarioGrupo
} from '@/api/services/horarioService';


const listarGrupoFromAPI = async () => {
  loading.value = true
  try {
    const data = await obtenerHorariosCompletos(); 
    grupos.value = data;
  } catch (error) {
    console.error("Error al cargar los horarios desde la API:", error);
    mensajeModalError.value = error.response?.data?.detail || "No se pudieron cargar los grupos.";
    mostrarModalError.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  listarGrupoFromAPI();
})

const anadirNuevoGrupo = async() => {
  const maxNro = Math.max(0, ...grupos.value.map(g => parseInt(g.nroGrupo) || 0));
  
  const nuevoGrupo = {
    nroGrupo: String(maxNro + 1),
    horaInicio: '09:00:00', 
    horaFin: '10:00:00',  
    dias_asignados: [],
    _isNew: true 
  }

  grupos.value.push(nuevoGrupo)
  
  await nextTick();

  if (listaGruposRef.value) {
    const ultimoElemento = listaGruposRef.value.lastElementChild;
    if (ultimoElemento) {
      ultimoElemento.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
}

const manejarGuardarGrupo = async (grupoModificado) => {
  console.log('Recibido para guardar:', grupoModificado);

  try {
    let mensaje = '';

    if (grupoModificado._isNew) {
      const grupoParaCrear = { ...grupoModificado };
      delete grupoParaCrear._isNew; 
      delete grupoParaCrear.originalNroGrupo;

      const grupoCreado = await crearHorarioGrupo(grupoParaCrear);

      const index = grupos.value.findIndex(g => g._isNew && g.nroGrupo === grupoModificado.nroGrupo);
      if (index !== -1) {
        grupos.value[index] = grupoCreado; 
      }
      mensaje = 'Grupo añadido correctamente';

    } else {
      const grupoParaGuardar = { ...grupoModificado };
      const grupoActualizado = await actualizarHorarioGrupo(grupoParaGuardar);

      const index = grupos.value.findIndex(g => g.nroGrupo === grupoModificado.originalNroGrupo);
      if (index !== -1) {
        grupos.value[index] = grupoActualizado;
      }
      mensaje = 'Grupo modificado correctamente';
    }
    
    mensajeModalExito.value = mensaje;
    mostrarModalExito.value = true;

  } catch (error) {
    console.error("Error al guardar el grupo:", error);
    const errorMsg = error.response?.data?.error || 'No se pudo guardar el grupo.';
    
    mensajeModalError.value = errorMsg;
    mostrarModalError.value = true;
  } finally {
    await listarGrupoFromAPI();
  }
}

// 1. PRIMER PASO: Abrir el modal de confirmación
const manejarEliminarGrupo = (grupoParaEliminar) => {
  console.log('Solicitud para eliminar:', grupoParaEliminar.nroGrupo);

  // Si es nuevo (aún no guardado en BD), se borra directo sin modal
  if (grupoParaEliminar._isNew) {
    grupos.value = grupos.value.filter(g => g.nroGrupo !== grupoParaEliminar.nroGrupo);
    return;
  }

  // Guardamos el grupo temporalmente y mostramos modal
  grupoPendienteEliminar.value = grupoParaEliminar;
  mensajeModalConfirmacion.value = "Estas seguro que desea elimianr este grupo, esta accion no se puede deshacer";
  mostrarModalConfirmacion.value = true;
}

// 2. SEGUNDO PASO: Ejecutar la eliminación real (API)
const confirmarEliminacion = async () => {
  // Cerramos modal de confirmación
  mostrarModalConfirmacion.value = false;
  
  if (!grupoPendienteEliminar.value) return;

  try {
    const exito = await eliminarHorarioGrupo(grupoPendienteEliminar.value.nroGrupo);

    if (exito) {
      // Eliminamos de la lista local
      grupos.value = grupos.value.filter(g => g.nroGrupo !== grupoPendienteEliminar.value.nroGrupo);
      
      // Mostramos modal de Éxito
      mensajeModalExito.value = 'Grupo eliminado correctamente';
      mostrarModalExito.value = true;
    } else {
      throw new Error("El servidor no reportó un error, pero la eliminación falló.");
    }

  } catch (error) {
    // Mostramos modal de Error
    const errorMsg = error.response?.data?.error || 'Error desconocido al eliminar el grupo.';
    mensajeModalError.value = errorMsg;
    mostrarModalError.value = true;
  } finally {
    // Limpiamos la variable temporal
    grupoPendienteEliminar.value = null;
  }
}

// ----- Funciones para cerrar los modales -----
const handleContinuarExito = () => {
  mostrarModalExito.value = false;
}

const handleContinuarError = () => {
  mostrarModalError.value = false;
}

</script>

<style scoped>
/* --- ESTILOS CON COLORES CORREGIDOS --- */

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
  position: relative; 
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

.acciones-globales {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start; 
}

.btn-anadir {
  padding: 0.8rem 1.5rem;
  background-color: #343a40; 
  color: white;
  border: none;
  border-radius: 8px; 
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.btn-anadir:hover {
  background-color: #23272b; 
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 1rem;
  color: #666;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #dc3545; 
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.lista-grupos {
  display: flex;
  flex-direction: column;
  gap: 1rem; 
}

/* Responsive */
@media (max-width: 768px) {
  .contenedor {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contenedor {
    padding: 1rem;
  }
  .acciones-globales {
    justify-content: stretch;
  }
  .btn-anadir {
    width: 100%;
    justify-content: center;
  }
}
.modal-footer {
  display: flex;
  justify-content: center; /* <--- ESTO centra los botones */
  align-items: center;
  gap: 1.5rem; /* Espacio entre los botones Cancelar y Confirmar */
  padding-bottom: 1.5rem; /* Un poco de aire abajo si lo necesitas */
  width: 100%;
}
</style>