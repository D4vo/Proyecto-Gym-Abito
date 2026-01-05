<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div class="modal-overlay" @click.self="$emit('cancelar')">
        <div class="resumen-container">
          <div class="resumen-header">
            <i class="fas fa-file-invoice-dollar"></i>
            <h3>Resumen de Pago</h3>
          </div>

          <div class="resumen-body">
            <div class="info-principal">
              <span class="mes-label">{{ nombreMes }} {{ cuota.anio }}</span>
              <span class="trabajo-label">{{ cuota.trabajo }}</span>
            </div>

            <div class="detalles-lista">
              <div class="detalle-item">
                <span>Monto Cuota</span>
                <span>${{ cuota.monto.toLocaleString('es-AR') }}</span>
              </div>

              <div class="detalle-item" :class="{ 'con-recargo': esVencida }">
                <span>Recargo por mora (10%)</span>
                <span>${{ recargoMora.toLocaleString('es-AR') }}</span>
              </div>

              <div class="detalle-item">
                <span>Servicio Mercado Pago (6.37%)</span>
                <span>${{ comisionMP.toLocaleString('es-AR') }}</span>
              </div>

              <div class="divisor"></div>

              <div class="detalle-item total">
                <span>Total a pagar</span>
                <span>${{ totalFinal.toLocaleString('es-AR') }}</span>
              </div>
            </div>
            
            <p class="nota-pago">
              <i class="fas fa-info-circle"></i> 
              Al continuar, serás redirigido para generar el código QR de pago.
            </p>
          </div>

          <div class="resumen-footer">
            <button class="btn-volver" @click="$emit('cancelar')">
              Volver
            </button>
            <button class="btn-pagar" @click="$emit('confirmar', totalFinal)">
              Continuar al Pago <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cuota: {
    type: Object,
    required: true
  },
  esVencida: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['cancelar', 'confirmar']);

// Lógica de Negocio
const nombreMes = computed(() => {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  // Maneja tanto el nombre en inglés del JSON como el número
  if (isNaN(props.cuota.mes)) {
    return props.cuota.mes; 
  }
  return meses[parseInt(props.cuota.mes) - 1];
});

const recargoMora = computed(() => {
  return props.esVencida ? props.cuota.monto * 0.10 : 0;
});

const subtotalConMora = computed(() => {
  return props.cuota.monto + recargoMora.value;
});

const comisionMP = computed(() => {
  return subtotalConMora.value * 0.0637;
});

const totalFinal = computed(() => {
  return subtotalConMora.value + comisionMP.value;
});
</script>

<style scoped>
.resumen-container {
  background: white;
  border-radius: 24px;
  width: 95%;
  max-width: 420px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.resumen-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.resumen-header i {
  font-size: 2.5rem;
  color: #009ee3; /* Azul Mercado Pago */
  margin-bottom: 0.5rem;
}

.resumen-header h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0;
}

.info-principal {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  border: 1px dashed #cbd5e1;
}

.mes-label {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1e293b;
}

.trabajo-label {
  font-size: 0.9rem;
  color: #64748b;
}

.detalles-lista {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.detalle-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #475569;
}

.con-recargo {
  color: #e11d48;
  font-weight: 500;
}

.divisor {
  height: 1px;
  background: #e2e8f0;
  margin: 0.5rem 0;
}

.total {
  font-size: 1.25rem !important;
  font-weight: 800;
  color: #0f172a !important;
  padding-top: 0.5rem;
}

.nota-pago {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 1.5rem;
  text-align: center;
  line-height: 1.4;
}

.resumen-footer {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2rem;
}

.btn-pagar {
  background: #009ee3;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.2s, background 0.2s;
}

.btn-pagar:hover {
  background: #008ad0;
  transform: translateY(-2px);
}

.btn-volver {
  background: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 0.8rem;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-volver:hover {
  background: #f1f5f9;
  color: #1e293b;
}

/* Responsive */
@media (max-width: 480px) {
  .resumen-container {
    padding: 1.5rem;
  }
  .total {
    font-size: 1.15rem !important;
  }
}
</style>