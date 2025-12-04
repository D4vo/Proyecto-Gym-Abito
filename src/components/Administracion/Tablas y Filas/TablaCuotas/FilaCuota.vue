<template>
  <tr v-if="!isMobile" class="fila-cuota desktop-view">
    <td class="col-mes-anio">
      <div class="mes-anio-container">
        <span class="mes-td">{{ obtenerNombreMes(cuota.mes) }}</span>
        <span class="anio-td">{{ cuota.anio }}</span>
      </div>
    </td>
    <td class="col-trabajo-suscripcion">
      <div class="trabajo-suscripcion-container">
        <div class="trabajo">{{ cuota.trabajo }}</div>
        <div class="suscripcion">{{ cuota.suscripcion }}</div>
      </div>
    </td>
    <td class="col-monto">
      <div class="monto-container">
        <span>${{ cuota.monto.toLocaleString('es-AR') }}</span>
        <span v-if="esPendiente && estaVencida" class="aumento-vencimiento-desktop">
          + 10%
        </span>
      </div>
    </td>
    <td class="col-accion">
      <div class="accion-container">
        <BotonAccion
          :pagada="cuota.pagada"
          :modo="modo"
          @accion-click="manejarAccionPrincipal"
        />
      </div>
    </td>
    <td class="col-estado">
      <div class="estado-container">
        <Estado :positivo="cuota.pagada" :texto="cuota.pagada ? 'PAGADA' : 'PENDIENTE'" />
        <div v-if="esPendiente" class="info-vencimiento" :class="claseVencimiento">
            <i v-if="estaPorVencer && !estaVencida" class="fas fa-exclamation-triangle warning-icon"></i>
            <span>{{ textoVencimiento }}</span>
        </div>
      </div>
    </td>
    <!--<td v-if="modo === 'infoAlumno'" class="col-adicional">
      <div class="botones-adicionales">
        <button class="boton-modificar" @click="manejarModificar">
          Modificar
        </button>
        <button class="boton-eliminar" @click="manejarEliminar">
          Eliminar
        </button>
      </div>
    </td>-->
  </tr>

  <div v-else class="cuota-card mobile-view" :class="{ 'expandida': expandida, 'pagada': cuota.pagada, 'vencida': esPendiente && estaVencida, 'por-vencer': esPendiente && estaPorVencer }">
    <div class="card-header" @click="toggleExpandida">
      <div class="mes-anio">
        <div class="mes-anio-texto">
            <span class="mes">{{ obtenerNombreMes(cuota.mes) }}</span>
            <span class="anio">{{ cuota.anio }}</span>
        </div>
        <span v-if="esPendiente" class="vencimiento-icono-header">
            <i v-if="estaVencida" class="fas fa-calendar-times vencida-icon" title="Cuota Vencida"></i>
            <i v-else-if="estaPorVencer" class="fas fa-exclamation-triangle por-vencer-icon" title="Cuota por Vencer"></i>
        </span>
      </div>
      <div class="monto-estado">
        <span class="monto">${{ cuota.monto.toLocaleString('es-AR') }}</span>
        <Estado :positivo="cuota.pagada" :texto="cuota.pagada ? 'PAGADA' : 'PENDIENTE'" />
      </div>

      <div class="expand-icon">
        <i :class="expandida ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </div>
    </div>

    <transition name="slide" mode="out-in">
      <div v-if="expandida" class="card-details">
        <div class="detail-row first-detail">
          <span class="detail-label">Trabajo:</span>
          <span class="detail-value">{{ cuota.trabajo }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Suscripción:</span>
          <span class="detail-value">{{ cuota.suscripcion }}</span>
        </div>

        <div v-if="esPendiente" class="detail-row info-vencimiento-mobile" :class="claseVencimiento">
          <span class="detail-label">Vencimiento:</span>
          <span class="detail-value">
              <i v-if="estaPorVencer && !estaVencida" class="fas fa-exclamation-triangle warning-icon"></i>
              {{ textoVencimiento }}
          </span>
        </div>

        <div v-if="esPendiente && estaVencida" class="detail-row aumento-vencimiento-mobile">
            <span class="detail-label aumento-label">Aumento Vencimiento:</span>
            <span class="detail-value aumento-value">+ 10%</span>
        </div>

        <div class="action-container">
          <BotonAccion
            :pagada="cuota.pagada"
            :modo="modo"
            :is-mobile="true"
            @accion-click="manejarAccionPrincipal"
          />
        </div>

        <!--<div v-if="modo === 'infoAlumno'" class="botones-adicionales-mobile">
          <button class="boton-modificar" @click="manejarModificar">
            Modificar
          </button>
          <button class="boton-eliminar" @click="manejarEliminar">
            Eliminar
          </button>
        </div>-->
      </div>
    </transition>
  </div>


  <!-- <tr v-if="!isMobile" class="fila-cuota desktop-view">
     </tr>

  <div v-else class="cuota-card mobile-view">
     </div> -->

  <Teleport to="body">
    <div v-if="mostrarModalQR" class="modal-overlay" @click.self="cerrarQR">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Escaneá para Pagar</h3>
          <button class="close-btn" @click="cerrarQR">&times;</button>
        </div>
        
        <p class="modal-subtitle">
          Cuota: {{ obtenerNombreMes(cuota.mes) }} - {{ cuota.trabajo }}
        </p>
        
        <div class="qr-wrapper">
          <qrcode-vue :value="urlPagoQR" :size="220" level="H" render-as="svg" />
        </div>
  
        <p class="instruccion">
          Abrí la App de Mercado Pago y escaneá este código.
        </p>
        
        <div class="modal-actions">
          <a :href="urlPagoQR" class="btn-link-directo" target="_blank">
            O pagá con este link directo
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue';

const mostrarModalQR = ref(false);
const urlPagoQR = ref('');


import pagosService from '@/api/services/pagosService';

import { verComprobante } from '@/api/services/pagosService';

import { ref, computed } from 'vue';
import BotonAccion from './BotonAccion.vue';
import Estado from '../../Estado.vue';

const props = defineProps({
  cuota: Object,
  isMobile: Boolean,
  modo: {
    type: String,
    default: 'cuota'
  }
});

const emit = defineEmits(['accion-principal', 'modificar', 'eliminar','PagoExitoso']);

const expandida = ref(false);

const toggleExpandida = () => {
  expandida.value = !expandida.value;
};

const obtenerNombreMes = (mes) => {
  const mesNum = parseInt(mes);
  if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) return mes;
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return meses[mesNum - 1];
};

// Computadas para Vencimiento (sin cambios)
const esPendiente = computed(() => !props.cuota.pagada);
const fechaVencimiento = computed(() => {
    if (!props.cuota.vencimiento) return null;
    try {
        // Asumiendo formato 'YYYY-MM-DD'
        const parts = props.cuota.vencimiento.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0]);
            const monthIndex = parseInt(parts[1]) - 1; // Meses en JS son 0-indexados
            const day = parseInt(parts[2]);
            // Importante: Crear en UTC para evitar problemas de zona horaria al comparar solo fechas
            return new Date(Date.UTC(year, monthIndex, day));
        }
    } catch (e) { console.error("Error parsing date:", props.cuota.vencimiento, e); }
    return null;
});
const diasRestantes = computed(() => {
    if (!fechaVencimiento.value) return Infinity; // Si no hay fecha, no vence
    const hoy = new Date();
    // Poner hoy a medianoche en UTC para comparar solo fechas
    const hoyUTC = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate()));
    const diffTime = fechaVencimiento.value.getTime() - hoyUTC.getTime();
    // +1 porque si vence hoy, la diferencia es 0, pero queremos que cuente como 0 días restantes
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});
const estaVencida = computed(() => diasRestantes.value < 0);
const estaPorVencer = computed(() => diasRestantes.value >= 0 && diasRestantes.value <= 5);
const textoVencimiento = computed(() => {
    if (!fechaVencimiento.value) return '';
    const dias = diasRestantes.value;
    const fechaFormatoLocal = fechaVencimiento.value.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }); // Especificar UTC
    if (estaVencida.value) { return `Venció el ${fechaFormatoLocal}`; }
    else if (dias === 0) { return 'Vence hoy'; }
    else if (dias === 1) { return 'Vence mañana'; }
    else if (estaPorVencer.value) { return `Vence en ${dias} días (${fechaFormatoLocal})`; }
    else { return `Vence el ${fechaFormatoLocal}`; }
});
const claseVencimiento = computed(() => {
    if (estaVencida.value) return 'vencida';
    if (estaPorVencer.value) return 'por-vencer';
    return '';
});

const procesandoPago = ref(false);
let intervaloPolling = null;

// Acciones 
const manejarAccionPrincipal = async () => {
  if (props.modo === 'cuota') {
    if (props.cuota.pagada) {
      // ACCIÓN PARA VER COMPROBANTE
      try {
        procesandoPago.value = true; // Reutilizamos tu variable de loading si quieres mostrar spinner
        await verComprobante(props.cuota.idCuota);
      } catch (e) {
        console.error('No se pudo generar el comprobante.', e);
      } finally {
        procesandoPago.value = false;
      }
      return;
    }
    console.log("modo de cuota", props.modo);
    console.log('Iniciando pago para cuota:', props.cuota.idCuota);
    try {
      procesandoPago.value = true;
      const data = await pagosService.iniciarPago(props.cuota.idCuota);
      const urlPago = data.init_point; 
      
      if (urlPago) {
        urlPagoQR.value = urlPago;
        mostrarModalQR.value = true;
        
        // INICIAR POLLING 
        iniciarPollingDePago(); 
      } else {
        alert('Error: No se recibió URL.');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al intentar iniciar el pago.');
    } finally {
      procesandoPago.value = false;
    }

  } else {
    // --- MODO ADMIN ---
    emit('accion-principal', props.cuota);
    console.log('Acción principal emitida para cuota:', props.cuota);
    
    // Si el Admin también quiere ver el comprobante directamente aquí:
    if (props.cuota.pagada) {
      try {
        await verComprobante(props.cuota.idCuota);
      } catch (e) {
        console.error(e);
      }
    }
  }
};

// --- NUEVAS FUNCIONES DE POLLING ---
const iniciarPollingDePago = () => {
  // Consultar cada 3 segundos (3000 ms)
  intervaloPolling = setInterval(async () => {
    const estaPagada = await pagosService.verificarEstadoPago(props.cuota.idCuota);

    console.log('Estado de pago verificado:', estaPagada);
    
    if (estaPagada) {
      // 1. Detenemos el polling
      detenerPolling();
      
      // 2. Cerramos el modal
      cerrarQR();
      
      // 3. Actualizamos la vista visualmente
      // (Vue 3 permite mutar objetos prop y se refleja, aunque idealmente deberías emitir un evento de recarga)
      console.log('Emitiendo PagoExitoso para cuota:', props.cuota);
      emit('PagoExitoso', props.cuota);
      //props.cuota.pagada = true; 
      
      // 4. Feedback al usuario (Opcional)
      // alert("¡Pago confirmado!"); 
    }
  }, 1500);
};

const detenerPolling = () => {
  if (intervaloPolling) {
    clearInterval(intervaloPolling);
    intervaloPolling = null;
  }
};

// --- MODIFICA LA FUNCIÓN cerrarQR PARA LIMPIAR EL INTERVALO ---
const cerrarQR = () => {
  mostrarModalQR.value = false;
  urlPagoQR.value = '';
  detenerPolling(); // <--- IMPORTANTE: Dejar de preguntar si cierra el modal
};


const manejarModificar = () => {
  console.log('Modificar cuota:', props.cuota);
  emit('modificar', props.cuota);
};
const manejarEliminar = () => {
  console.log('Eliminar cuota:', props.cuota);
  emit('eliminar', props.cuota);
};
</script>

<style scoped>
/* --- ESTILOS RE-INDENTADOS Y CON ADICIONES PARA ICONO HEADER --- */

/* Botones Adicionales (sin cambios) */
.botones-adicionales {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.botones-adicionales-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
  width: 100%;
}
.boton-modificar, .boton-eliminar {
  padding: 6px 12px;
  font-size: 0.85rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  white-space: nowrap;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  width: 100%;
  max-width: 120px;
  margin: 0 auto;
}
.boton-modificar:hover, .boton-eliminar:hover {
  transform: scale(1.05);
}
.boton-modificar {
  background: #e3f2fd;
  color: #1976d2;
  border: 1px solid #1976d2;
}
.boton-eliminar {
  background: #ffebee;
  color: #d32f2f;
  border: 1px solid #d32f2f;
}
.col-adicional {
  text-align: center;
  width: 10%;
  padding: 0.75rem 0.5rem !important;
}

/* Vencimiento (sin cambios) */
.info-vencimiento {
  font-size: 0.8rem;
  margin-top: 0.4rem;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}
.info-vencimiento.por-vencer { color: #ff9800; font-weight: 500; }
.info-vencimiento.vencida { color: #d32f2f; font-weight: 600; }
.warning-icon { font-size: 0.9em; }
.info-vencimiento-mobile .detail-value { display: flex; align-items: center; gap: 0.3rem; color: #6c757d; font-weight: 500; }
.info-vencimiento-mobile.por-vencer .detail-value { color: #ff9800; }
.info-vencimiento-mobile.vencida .detail-value { color: #d32f2f; font-weight: 600; }

/* V V V NUEVOS ESTILOS PARA ICONO EN HEADER MÓVIL V V V */
.mes-anio {
  display: flex; /* Cambiado a flex */
  align-items: center; /* Alinear verticalmente texto e icono */
  gap: 0.5rem; /* Espacio entre texto e icono */
  flex: 1; /* Ocupa espacio disponible */
}
.mes-anio-texto {
  display: flex;
  flex-direction: column; /* Apila mes y año */
}
.vencimiento-icono-header {
  font-size: 1.1rem; /* Tamaño del icono */
  display: inline-flex; /* Para que esté en línea */
  align-items: center;
}
.por-vencer-icon {
  color: #ff9800; /* Naranja */
}
.vencida-icon {
  color: #d32f2f; /* Rojo oscuro */
}
/* ^ ^ ^ FIN NUEVOS ESTILOS ^ ^ ^ */

/* Estilos Fila Desktop (sin cambios lógicos) */
.fila-cuota.desktop-view { height: 70px; border-bottom: 1px solid #eee; font-family: 'Poppins', sans-serif; font-size: 0.95rem; transition: all 0.2s ease; }
.fila-cuota.desktop-view:hover { background-color: #f8fafc; }
.fila-cuota.desktop-view td { vertical-align: middle; padding: 0.75rem 0.5rem; height: 70px; box-sizing: border-box; }
.mes-anio-container, .trabajo-suscripcion-container, .monto-container, .accion-container, .estado-container { display: flex; flex-direction: column; justify-content: center; height: 100%; width: 100%; }
.col-mes-anio { text-align: center; width: 15%; padding: 0.75rem 0.5rem !important; }
.mes-td { font-weight: 700; font-size: 1rem; color: #2c3e50; line-height: 1.2; text-align: center; }
.anio-td { font-size: 0.85rem; color: #718096; margin-top: 0.3rem; line-height: 1.2; text-align: center; }
.col-trabajo-suscripcion { text-align: left; padding: 0.75rem 0.5rem !important; width: 35%; padding-left: 1.5rem !important; }
.trabajo-suscripcion-container { justify-content: center; align-items: flex-start; }
.trabajo { font-weight: 700; font-size: 1rem; color: #2c3e50; line-height: 1.2; text-align: left; width: 100%; }
.suscripcion { font-size: 0.85rem; color: #718096; margin-top: 0.3rem; line-height: 1.2; text-align: left; width: 100%; }
.col-monto { text-align: right; padding: 0.75rem 0.5rem !important; padding-right: 1.5rem !important; width: 15%; }
/* .monto-container modificado para alinear el +10% */
.monto-container { align-items: flex-end; justify-content: center; text-align: right; font-weight: 600; color: #2c3e50;}
.col-accion { text-align: center; width: 20%; padding: 0.75rem 0.5rem !important; }
.accion-container { align-items: center; justify-content: center; display: flex; }
.col-estado { text-align: center; width: 15%; padding: 0.75rem 0.5rem !important; }
.estado-container { align-items: center; justify-content: center; display: flex; flex-direction: column; }

/* Estilos Card Móvil (Base sin cambios) */
.cuota-card.mobile-view { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden; width: 100%; transition: all 0.3s ease; }
.cuota-card.mobile-view.pagada { opacity: 0.9; border-left: 4px solid #4caf50; }
.cuota-card.mobile-view:not(.pagada) { border-left: 4px solid #ff4d4d; }
.cuota-card.mobile-view.vencida:not(.pagada) { border-left-color: #d32f2f !important; }
.cuota-card.mobile-view.por-vencer:not(.pagada) { border-left-color: #ff9800 !important; }

.card-header { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem; cursor: pointer; width: 100%; box-sizing: border-box; transition: background-color 0.2s ease; }
.card-header:hover { background-color: #f8f9fa; }
/* .mes-anio ya modificado arriba */
.mes { font-weight: 600; font-size: 1.1rem; color: #2c3e50; }
.anio { font-size: 0.9rem; color: #7f8c8d; margin-top: 0.2rem; }
.monto-estado { display: flex; flex-direction: column; align-items: flex-end; margin: 0 1rem; gap: 0.3rem; }
.monto { font-weight: 700; font-size: 1.1rem; color: #2c3e50; }
.expand-icon { color: #95a5a6; font-size: 0.9rem; transition: transform 0.3s ease; }
.cuota-card.mobile-view.expandida .expand-icon { transform: rotate(180deg); }
.slide-enter-active { animation: slideDown 0.4s ease-out; }
.slide-leave-active { animation: slideUp 0.25s ease-in; }
@keyframes slideDown { from { max-height: 0; opacity: 0; transform: translateY(-10px); } to { max-height: 300px; opacity: 1; transform: translateY(0); } } /* Aumentado max-height */
@keyframes slideUp { from { max-height: 300px; opacity: 1; transform: translateY(0); } to { max-height: 0; opacity: 0; transform: translateY(-10px); } }
.card-details { padding: 0 1.2rem 1.2rem 1.2rem; width: 100%; box-sizing: border-box; overflow: hidden; }
.detail-row { display: flex; justify-content: space-between; margin-bottom: 1rem; width: 100%; align-items: flex-start; }
.first-detail { margin-top: 1.2rem; }
.detail-label { font-weight: 600; color: #7f8c8d; font-size: 0.9rem; min-width: 80px; }
.detail-value { color: #2c3e50; font-size: 0.9rem; text-align: right; margin-left: 1rem; flex: 1; line-height: 1.4; }
.action-container { display: flex; justify-content: center; margin-top: 1.5rem; width: 100%; }

/* --- NUEVOS ESTILOS PARA AUMENTO --- */
.aumento-vencimiento-desktop {
  font-size: 0.8rem;
  color: #d32f2f;
  font-weight: 500;
  margin-top: 0.3rem;
  line-height: 1;
  display: block;
  text-align: right;
}
.aumento-vencimiento-mobile .aumento-label {
  font-weight: 600;
  color: #d32f2f;
  font-size: 0.9rem;
}
.aumento-vencimiento-mobile .aumento-value {
  color: #d32f2f;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: right;
}

/* Media Queries (ajustados para incluir aumento) */
@media (max-width: 768px) {
  .boton-modificar, .boton-eliminar { padding: 8px 14px; font-size: 0.9rem; min-height: 38px; max-width: 140px; }
  .botones-adicionales-mobile { gap: 1rem; }
  .card-header { padding: 1rem; }
  .mes { font-size: 1rem; }
  .monto { font-size: 1rem; }
  .monto-estado { margin: 0 0.8rem; gap: 0.2rem; }
  .card-details { padding: 0 1rem 1rem 1rem; }
  .detail-row { margin-bottom: 0.9rem; }
  .first-detail { margin-top: 1rem; }
  .action-container { margin-top: 1.2rem; }
  .vencimiento-icono-header { font-size: 1rem; }
  /* Ajuste aumento mobile */
  .aumento-vencimiento-mobile .aumento-label,
  .aumento-vencimiento-mobile .aumento-value {
     font-size: 0.85rem;
  }
}

@media (max-width: 380px) {
  .card-header { padding: 0.8rem; }
  .mes { font-size: 0.95rem; }
  .anio { font-size: 0.8rem; }
  .monto { font-size: 0.95rem; }
  .monto-estado { margin: 0 0.5rem; }
  .card-details { padding: 0 0.8rem 0.8rem 0.8rem; }
  .detail-label, .detail-value { font-size: 0.85rem; }
  .detail-row { margin-bottom: 0.8rem; }
  .first-detail { margin-top: 0.8rem; }
  .action-container { margin-top: 1rem; }
  .vencimiento-icono-header { font-size: 0.9rem; }
  /* Ajuste aumento mobile */
  .aumento-vencimiento-mobile .aumento-label,
  .aumento-vencimiento-mobile .aumento-value {
     font-size: 0.8rem;
  }
  /* Ajuste aumento desktop */
  .aumento-vencimiento-desktop {
     font-size: 0.75rem;
  }
}

/* === AGREGAR AL FINAL DE LOS ESTILOS === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  animation: popIn 0.3s ease;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #95a5a6;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.modal-subtitle {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.qr-wrapper {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
}

.instruccion {
  font-size: 0.9rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.btn-link-directo {
  display: inline-block;
  padding: 10px 20px;
  background-color: #009ee3; /* Azul MP */
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.btn-link-directo:hover {
  background-color: #007eb5;
}

@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

</style>