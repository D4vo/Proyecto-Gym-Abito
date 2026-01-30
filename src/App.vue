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
/* Contenedor principal del Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.8); /* Fondo oscuro azulado profundo */
  backdrop-filter: blur(4px); /* Efecto de desenfoque premium */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 20px;
}

/* Caja de contenido del Modal */
.modal-content {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-top: 6px solid #e91e63; /* Borde superior con el color de la marca */
  animation: modalIn 0.3s ease-out;
}

/* Icono o Título Principal */
.modal-content h3 {
  color: #1e293b;
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

/* Mensaje de texto */
.modal-content p {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

/* Botón Iniciar Sesión */
.modal-content button {
  width: 100%;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
}

.modal-content button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(233, 30, 99, 0.4);
  filter: brightness(1.1);
}

.modal-content button:active {
  transform: translateY(0);
}

/* Animación de entrada */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Ajustes específicos para móviles */
@media (max-width: 480px) {
  .modal-content {
    padding: 2rem 1.5rem;
    margin: 0 10px;
  }
  
  .modal-content h3 {
    font-size: 1.4rem;
  }
  
  .modal-content p {
    font-size: 0.95rem;
  }
}
</style>