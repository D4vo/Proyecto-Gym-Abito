<template>
  <div class="contenedor">
    <div class="encabezado">
      <Titulo texto="Contabilidad" />
      <p class="subtitulo">Reportes Contables</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Titulo from '../../Titulo.vue';

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

</style>