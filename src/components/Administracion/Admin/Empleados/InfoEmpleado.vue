<template>
  <div class="contenedor">
    <div class="encabezado">
      <Titulo texto="información del Empleado" />
    </div>
  </div>
</template>

<script setup>
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


</style>