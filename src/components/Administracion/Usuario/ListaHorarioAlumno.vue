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
          <i class="fas fa-clock icono-reloj"></i>
          <span class="hora">{{ horario.horaInicio }}</span>
          <span class="hs-texto">hs</span>
        </div>
        
        <div class="separador">
          <i class="fas fa-long-arrow-alt-right"></i>
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
/* Forzamos tipografías modernas y limpias para evitar la fuente por defecto del navegador */
.tarjeta-horario {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  border-radius: 18px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05); /* Sombra mucho más suave y amplia */
  border: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tarjeta-horario:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

/* Línea roja lateral más sutil */
.tarjeta-decoracion {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(180deg, #e50914 0%, #ff4d4d 100%);
  border-radius: 18px 0 0 18px;
}

.tarjeta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
}

.dia-nombre {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827; /* Gris muy oscuro, casi negro */
  letter-spacing: -0.02em; /* Letras un poco más juntas (efecto moderno) */
}

.grupo-badge {
  background: #f3f4f6;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
}

.grupo-badge span {
  font-size: 0.75rem;
  font-weight: 700;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tarjeta-body {
  padding-left: 0.5rem;
}

/* Contenedor del reloj estilo Widget */
.tiempo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fdfdfd;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
}

.tiempo-item {
  display: flex;
  align-items: baseline; /* Alinea los números con el 'hs' perfectamente */
  gap: 0.3rem;
}

.icono-reloj {
  color: #e50914;
  font-size: 1.1rem;
  margin-right: 0.4rem;
  align-self: center; /* Centra el icono respecto al texto */
}

.hora {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.01em;
}

.hs-texto {
  font-size: 0.85rem;
  color: #9ca3af;
  font-weight: 600;
}

.separador {
  color: #d1d5db;
  display: flex;
  align-items: center;
}

.separador i {
  font-size: 1.1rem;
}
</style>