<template>
  <div class="form-wrapper">
    <form class="auth-form" @submit.prevent="finalizarRegistro">
      
      <div class="step-indicator">
        <div class="step completed">✓</div>
        <div class="step-line completed"></div>
        <div class="step active">2</div>
      </div>

      <h3 class="form-title">Completa tus datos</h3>

      <div class="form-grid">
        <div class="form-group">
          <div class="input-container">
            <input type="text" v-model="profileData.nombre" id="nombre" class="form-input" placeholder=" " required autocomplete="given-name">
            <label for="nombre" class="form-label">Nombre</label>
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <input type="text" v-model="profileData.apellido" id="apellido" class="form-input" placeholder=" " required autocomplete="family-name">
            <label for="apellido" class="form-label">Apellido</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="input-container">
          <input 
            type="text" 
            v-model="profileData.dni" 
            id="dni" 
            class="form-input" 
            placeholder=" " 
            required 
            autocomplete="off"
            @input="filtrarNumerosDNI"
            maxlength="10"
          >
          <label for="dni" class="form-label">DNI</label>
        </div>
      </div>

      <div class="form-group">
        <div class="input-container phone-container" ref="phoneContainer">
          
          <div class="custom-select-wrapper">
            <div class="custom-select-trigger" @click="toggleDropdown">
              <img 
                :src="`https://flagcdn.com/w40/${selectedCountry.iso}.png`" 
                :alt="selectedCountry.name"
                class="flag-icon"
              >
              <span class="country-code">{{ selectedCountry.code }}</span>
              <span class="arrow" :class="{ rotated: isOpen }">▼</span>
            </div>

            <transition name="dropdown-fade">
              <ul v-if="isOpen" class="custom-options">
                <li 
                  v-for="country in countries" 
                  :key="country.iso" 
                  class="custom-option"
                  :class="{ selected: country.iso === selectedCountry.iso }"
                  @click="selectCountry(country)"
                >
                  <img 
                    :src="`https://flagcdn.com/w40/${country.iso}.png`" 
                    :alt="country.name"
                    class="flag-icon-small"
                  >
                  <span class="option-text">{{ country.code }}</span>
                </li>
              </ul>
            </transition>
          </div>
          
          <div class="vertical-divider"></div>

          <input 
            type="tel" 
            v-model="profileData.telefono" 
            id="telefono" 
            class="form-input phone-input" 
            placeholder=" " 
            required 
            autocomplete="tel-national"
            @input="filtrarNumerosTel"
          >
          <label for="telefono" class="form-label phone-label">Teléfono</label>
        </div>
      </div>

      <div class="form-group">
        <div class="input-container">
          <select v-model="profileData.sexo" id="sexo" class="form-input dark-select" required>
            <option value="" disabled selected></option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          <label for="sexo" class="form-label">Sexo</label>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <div class="input-container">
            <select v-model="profileData.provincia" id="provincia" class="form-input dark-select" required>
              <option value="" disabled selected></option>
              <option>Buenos Aires</option>
              <option>Córdoba</option>
              <option>Santa Fe</option>
              <option>Chaco</option>
              <option>Mendoza</option>
            </select>
            <label for="provincia" class="form-label">Provincia</label>
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <select v-model="profileData.localidad" id="localidad" class="form-input dark-select" required>
              <option value="" disabled selected></option>
              <option>La Plata</option>
              <option>Sáenz Peña</option>
              <option>Resistencia</option>
              <option>Capital Federal</option>
            </select>
            <label for="localidad" class="form-label">Localidad</label>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <div class="input-container">
            <input type="text" v-model="profileData.calle" id="calle" class="form-input" placeholder=" " required autocomplete="address-line1">
            <label for="calle" class="form-label">Calle</label>
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <input type="text" v-model="profileData.numero" id="numero" class="form-input" placeholder=" " required autocomplete="address-line2">
            <label for="numero" class="form-label">Número</label>
          </div>
        </div>
      </div>

      <button type="submit" class="auth-btn primary" :disabled="loading">
        <span v-if="!loading">FINALIZAR REGISTRO</span>
        <div class="btn-loader" v-else></div>
      </button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterStep2',
  data() {
    return {
      loading: false,
      isOpen: false, // Controla si el dropdown está abierto
      selectedCountry: { code: '+54', iso: 'ar', name: 'Argentina' },
      countries: [
        { code: '+54', iso: 'ar', name: 'Argentina' },
        { code: '+1', iso: 'us', name: 'USA' },
        { code: '+34', iso: 'es', name: 'España' },
        { code: '+55', iso: 'br', name: 'Brasil' },
        { code: '+598', iso: 'uy', name: 'Uruguay' },
        { code: '+56', iso: 'cl', name: 'Chile' },
        { code: '+57', iso: 'co', name: 'Colombia' },
        { code: '+52', iso: 'mx', name: 'México' },
      ],
      profileData: {
        nombre: '', apellido: '', dni: '', telefono: '',
        sexo: '', provincia: '', localidad: '', calle: '', numero: ''
      }
    }
  },
  mounted() {
    // Cerrar dropdown si se hace click fuera
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectCountry(country) {
      this.selectedCountry = country;
      this.isOpen = false;
    },
    handleClickOutside(event) {
      // Si el click no fue dentro del contenedor del teléfono, cerramos el dropdown
      if (this.$refs.phoneContainer && !this.$refs.phoneContainer.contains(event.target)) {
        this.isOpen = false;
      }
    },
    filtrarNumerosDNI(event) {
      const valor = event.target.value;
      this.profileData.dni = valor.replace(/\D/g, '');
    },
    filtrarNumerosTel(event) {
      const valor = event.target.value;
      this.profileData.telefono = valor.replace(/\D/g, '');
    },
    finalizarRegistro() {
      this.loading = true;
      const telefonoCompleto = `${this.selectedCountry.code} ${this.profileData.telefono}`;
      const datosFinales = { ...this.profileData, telefono: telefonoCompleto };

      setTimeout(() => {
        console.log("Datos finales:", datosFinales);
        alert("¡Registro Completado Exitosamente!");
        this.loading = false;
        this.$router.push('/login');
      }, 2000);
    }
  }
}
</script>

<style scoped>
/* REUTILIZACIÓN DE ESTILOS BASE */
.form-wrapper { animation: slideUp 0.6s ease; }
.auth-form { display: flex; flex-direction: column; gap: 1.2rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { position: relative; }
.form-title { text-align: center; color: white; margin-bottom: 1rem; font-family: 'Poppins', sans-serif; }

/* INDICADORES */
.step-indicator { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
.step { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.5); font-family: 'Inter', sans-serif; font-size: 0.9rem; }
.step.active { background: rgba(229, 9, 20, 0.2); color: #e50914; border: 1px solid #e50914; }
.step.completed { background: #00ff88; color: #000; }
.step-line { flex: 1; height: 2px; background: rgba(255, 255, 255, 0.1); max-width: 60px; }
.step-line.completed { background: #00ff88; }

/* INPUT CONTAINER */
.input-container {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 60px;
  transition: all 0.3s ease;
}
.input-container:hover { background: rgba(255, 255, 255, 0.06); }
.input-container:focus-within { border-color: #e50914; background: rgba(255, 255, 255, 0.08); box-shadow: 0 0 0 4px rgba(229, 9, 20, 0.1); }

/* INPUTS */
.form-input {
  width: 100%; height: 100%;
  background: transparent; border: none;
  padding: 20px 16px 6px 16px;
  color: #fff; font-size: 1rem; font-family: 'Inter', sans-serif;
  border-radius: 12px;
}
.form-input:focus { outline: none; }

/* ETIQUETAS */
.form-label {
  position: absolute; top: 50%; left: 16px; transform: translateY(-50%);
  color: #888; font-size: 1rem; pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
}
.form-input:focus + .form-label, 
.form-input:not(:placeholder-shown) + .form-label,
select.form-input:valid + .form-label {
  top: 14px; font-size: 0.75rem; color: #ffffff; font-weight: 600; letter-spacing: 0.5px;
}

/* --- CUSTOM DROPDOWN PROFESIONAL --- */
.phone-container {
  display: flex;
  align-items: center;
  padding: 0;
  z-index: 20; /* Asegurar que el dropdown quede por encima */
}

.custom-select-wrapper {
  position: relative;
  width: 110px; /* Ancho fijo para el selector */
  height: 100%;
  flex-shrink: 0;
}

.custom-select-trigger {
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  padding-left: 10px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  transition: background 0.2s;
}
.custom-select-trigger:hover { background: rgba(255,255,255,0.05); }

.flag-icon { width: 22px; height: auto; border-radius: 2px; object-fit: cover; }
.country-code { color: #fff; font-size: 0.95rem; font-family: 'Inter', sans-serif; }
.arrow { color: #888; font-size: 0.6rem; transition: transform 0.3s; }
.arrow.rotated { transform: rotate(180deg); }

/* Lista de opciones */
.custom-options {
  position: absolute;
  top: 105%; /* Justo debajo */
  left: 0;
  width: 140px; /* Un poco más ancho que el trigger */
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  list-style: none;
  padding: 5px;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
  z-index: 100;
}

/* Scrollbar personalizada */
.custom-options::-webkit-scrollbar { width: 4px; }
.custom-options::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }

.custom-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}
.custom-option:hover { background: rgba(255,255,255,0.1); }
.custom-option.selected { background: rgba(229, 9, 20, 0.2); color: #fff; }

.flag-icon-small { width: 20px; height: auto; border-radius: 2px; }
.option-text { color: #ccc; font-size: 0.9rem; font-family: 'Inter', sans-serif; }

/* Animación del Dropdown */
.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: all 0.2s ease; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-10px); }


.vertical-divider { width: 1px; height: 60%; background: rgba(255,255,255,0.1); margin: 0 5px; }

.phone-input { flex-grow: 1; padding-left: 10px; }
.phone-label { left: 125px; } /* Ajustado para el nuevo ancho del trigger */
.phone-input:focus + .phone-label, 
.phone-input:not(:placeholder-shown) + .phone-label {
  left: 125px; 
}

/* OTROS SELECTS (Provincias, Sexo) */
.dark-select option { background-color: #1a1a1a; color: #ffffff; padding: 10px; }
select.form-input { cursor: pointer; }

/* BOTON */
.auth-btn { width: 100%; padding: 1rem; background: linear-gradient(135deg, #e50914, #ff3f3f); border: none; border-radius: 12px; color: white; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; font-family: 'Poppins', sans-serif; box-shadow: 0 4px 15px rgba(229, 9, 20, 0.25); margin-top: 1rem; }
.auth-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(229, 9, 20, 0.4); }
.auth-btn:disabled { opacity: 0.7; cursor: not-allowed; background: #555; }

.btn-loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid #fff; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* AUTOCOMPLETE FIX */
.form-input:-webkit-autofill,
.form-input:-webkit-autofill:hover, 
.form-input:-webkit-autofill:focus, 
.form-input:-webkit-autofill:active {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s;
  caret-color: #ffffff;
}
</style>