<template>
  <div id="app">
    <router-view />

    <div v-if="showSessionExpiredModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Sesión Expirada</h3>
        <p>Tu sesión ha caducado por seguridad. Por favor, inicia sesión nuevamente.</p>
        <button @click="irALogin">Iniciar Sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
import { removeUser } from '@/api/storage/userStorage';

export default {
  data() {
    return {
      showSessionExpiredModal: false
    };
  },
  created() {
    // Escuchar el evento disparado desde el interceptor de Axios
    window.addEventListener('session-expired', this.handleSessionExpired);
  },
  beforeUnmount() { // O beforeDestroy en Vue 2
    window.removeEventListener('session-expired', this.handleSessionExpired);
  },
  methods: {
    handleSessionExpired() {
      this.showSessionExpiredModal = true;
    },
    irALogin() {
      removeUser(); // Limpiar storage por si acaso
      this.showSessionExpiredModal = false;
      this.$router.push('/login'); // O la ruta de tu login
    }
  }
};
</script>

<style>
/* Estilos básicos para el modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>