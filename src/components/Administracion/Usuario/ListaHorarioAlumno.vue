<template>
  <div class="tarjeta-horario">
    <div class="tarjeta-decoracion"></div>
    
    <div class="tarjeta-header">
      <div class="dia-info">
        <span class="dia-nombre">{{ horario.dia }}</span>
      </div>
      <div class="grupo-badge">
        <span>Grupo {{ horario.nroGrupo }}</span>
      </div>
    </div>
    
    <div class="tarjeta-body">
      <div class="tiempo-container">
        <div class="tiempo-item">
          <i class="fas fa-clock"></i>
          <span class="hora">{{ horario.horaInicio }}</span>
        </div>
        <div class="separador">
          <i class="fas fa-arrow-right"></i>
        </div>
        <div class="tiempo-item">
          <span class="hora">{{ horario.horaFin }}</span>
          <span class="hs-texto">hs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  horario: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.tarjeta-horario {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.tarjeta-horario:active {
  transform: scale(0.98);
}

/* Línea roja lateral estilo Abito */
.tarjeta-decoracion {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #e50914 0%, #ff3f3f 100%);
  border-radius: 16px 0 0 16px;
}

.tarjeta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
}

.dia-nombre {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.grupo-badge {
  background: #f8f9fa;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  border: 1px solid #e9ecef;
}

.grupo-badge span {
  font-size: 0.8rem;
  font-weight: 700;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tarjeta-body {
  padding-left: 0.5rem;
}

.tiempo-container {
  display: inline-flex;
  align-items: center;
  background: #fdfdfd;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
}

.tiempo-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tiempo-item i {
  color: #e50914;
  font-size: 1.1rem;
}

.hora {
  font-size: 1.15rem;
  font-weight: 700;
  color: #333;
}

.separador {
  margin: 0 0.8rem;
  color: #ccc;
  font-size: 0.8rem;
}

.hs-texto {
  font-size: 0.9rem;
  color: #888;
  font-weight: 600;
  margin-left: 2px;
}
</style>