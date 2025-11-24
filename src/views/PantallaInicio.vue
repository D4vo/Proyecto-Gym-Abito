<template>
  <div class="main-wrapper" ref="mainContainer">
    
    <div class="bg-pattern-fixed"></div>

    <div class="hero-container">
      <div class="hero-parallax-layer" :style="{ transform: `translateY(${scrollY * 0.5}px)` }">
        <FondoInicio />
      </div>
      <div class="hero-gradient-overlay"></div>
    </div>

    <section id="metodologias" class="section-container methods-section">
      <div class="content-limit">
        <div class="header-group reveal-on-scroll">
          <span class="brand-tag">NUESTRO SISTEMA</span>
          <h2 class="brand-title">PERFORMANCE</h2>
          <div class="title-decoration"></div>
        </div>
        
        <div class="staggered-grid">
          <div class="grid-column left-col">
             <Metodologia
              v-for="(item, index) in metodologiasPares"
              :key="item.id || index"
              :metodo="item"
              :index="(index * 2) + 1" 
              class="reveal-on-scroll card-spacer"
            />
          </div>
          
          <div class="grid-column right-col" :style="{ transform: `translateY(-${scrollY * 0.06}px)` }">
             <Metodologia
              v-for="(item, index) in metodologiasImpares"
              :key="item.id || index"
              :metodo="item"
              :index="(index * 2) + 2" 
              class="reveal-on-scroll card-spacer"
            />
          </div>
        </div>
      </div>
    </section>

    <div class="bottom-wrapper">
      
      <div class="marquee-wrapper">
        <div class="marquee-track">
          <div class="marquee-content">
              NO LIMITS /// TRAIN HARD /// RESULTS /// DISCIPLINE /// POWER /// PERFORMANCE ///
              NO LIMITS /// TRAIN HARD /// RESULTS /// DISCIPLINE /// POWER /// PERFORMANCE ///
          </div>
          <div class="marquee-content" aria-hidden="true">
              NO LIMITS /// TRAIN HARD /// RESULTS /// DISCIPLINE /// POWER /// PERFORMANCE ///
              NO LIMITS /// TRAIN HARD /// RESULTS /// DISCIPLINE /// POWER /// PERFORMANCE ///
          </div>
        </div>
      </div>

      <section id="precios" class="section-container prices-section">
        <div class="content-limit wide-limit">
          <div class="header-group reveal-on-scroll">
            <span class="brand-tag">MEMBRESÍAS</span>
            <h2 class="brand-title">PLANES</h2>
            <div class="title-decoration"></div>
            <p class="brand-subtitle">ELIGE TU NIVEL</p>
          </div>

          <div class="pricing-flex">
            <Precio
              v-for="(item, index) in precios"
              :key="index"
              :precio="item"
              class="pricing-item reveal-on-scroll"
              :style="{ transitionDelay: `${index * 100}ms` }"
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>

  </div>
</template>

<script setup>
import Footer from '../components/Inicio/Footer.vue'
import FondoInicio from '@/components/Inicio/FondoInicio.vue'
import Metodologia from '../components/Inicio/Metodologias.vue'
import Precio from '../components/Inicio/Precio.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { obtenerTrabajos } from '@/api/services/trabajoService.js'
import { obtenerSuscripciones } from '@/api/services/suscripcionesService'

const metodologias = ref([])
const precios = ref([])
const scrollY = ref(0) 

const metodologiasPares = computed(() => metodologias.value.filter((_, i) => i % 2 === 0));
const metodologiasImpares = computed(() => metodologias.value.filter((_, i) => i % 2 !== 0));

let observer = null

const handleScroll = () => {
  requestAnimationFrame(() => {
    scrollY.value = window.scrollY;
  });
};

onMounted(async () => {
  try { metodologias.value = await obtenerTrabajos() } catch (e) { console.error(e) }
  try { precios.value = await obtenerSuscripciones() } catch (e) { console.error(e) }
  
  window.addEventListener('scroll', handleScroll);
  setTimeout(initObserver, 300);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (observer) observer.disconnect();
})

const initObserver = () => {
  const options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, options)
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))
}
</script>

<style scoped>
/* --- BASE --- */
.main-wrapper {
  background-color: #050505;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  position: relative;
  /* Eliminamos cualquier restricción de altura */
}

.bg-pattern-fixed {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(#1a1a1a 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
}

.content-limit { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }
.wide-limit { max-width: 1400px; }

/* --- HERO --- */
.hero-container {
  position: relative;
  width: 100%;
  height: 100vh; 
  overflow: hidden;
  z-index: 1;
  background-color: #050505;
}
.hero-parallax-layer { width: 100%; height: 120%; position: absolute; top: 0; left: 0; will-change: transform; }
.hero-gradient-overlay {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 300px;
  background: linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.8) 60%, #050505 100%);
  pointer-events: none; z-index: 3;
}

/* --- SECCIONES COMUNES --- */
.section-container {
  position: relative;
  z-index: 5;
}

.methods-section {
  padding: 100px 0; /* Espacio suficiente arriba y abajo */
}

.header-group { text-align: center; margin-bottom: 80px; display: flex; flex-direction: column; align-items: center; }
.brand-tag { color: #e50914; font-size: 0.8rem; font-weight: 700; letter-spacing: 3px; margin-bottom: 10px; text-transform: uppercase; }
.brand-title { font-size: 4rem; font-weight: 800; letter-spacing: -2px; color: #fff; margin: 0; text-transform: uppercase; line-height: 1; }
.title-decoration { width: 80px; height: 4px; background-color: #e50914; margin-top: 20px; }
.brand-subtitle { font-size: 1rem; color: #aaa; letter-spacing: 4px; text-transform: uppercase; margin-top: 15px; font-weight: 600; }

/* --- GRID DE METODOLOGÍAS ARREGLADO --- */
.staggered-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Divide en 2 columnas iguales */
  gap: 60px; /* ESPACIO GENEROSO ENTRE COLUMNAS */
  align-items: start;
}

/* Configuración de Columnas Verticales */
.grid-column {
  display: flex;
  flex-direction: column;
  gap: 60px; /* ESPACIO GENEROSO ENTRE TARJETAS (ARRIBA/ABAJO) */
}

/* Desplazamiento inicial de la columna derecha para efecto escalonado */
.right-col {
  margin-top: 120px; 
  will-change: transform;
}

/* --- CINTA --- */
.marquee-wrapper {
  background: #e50914;
  padding: 20px 0;
  transform: skewY(-2deg);
  width: 100%;
  overflow: hidden;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin: 100px 0; /* Espacio para separar de metodologías */
  position: relative;
  z-index: 10;
  box-shadow: 0 10px 50px rgba(0,0,0,0.8); 
}

.marquee-track { display: flex; width: fit-content; animation: scroll 30s linear infinite; }
.marquee-content { white-space: nowrap; font-size: 1.4rem; font-weight: 900; color: #000; letter-spacing: 2px; padding-right: 50px; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* --- PRECIOS --- */
.prices-section {
  padding-bottom: 100px;
}

.pricing-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
.pricing-item { flex: 1 1 300px; max-width: 380px; min-width: 280px; }

/* ANIMACIONES */
.reveal-on-scroll { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.215, 0.610, 0.355, 1); }
.reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .brand-title { font-size: 2.5rem; }
  
  /* En móvil, una sola columna */
  .staggered-grid { 
    grid-template-columns: 1fr; 
    gap: 40px; 
  }
  
  /* Reseteamos márgenes y gaps en móvil */
  .right-col { margin-top: 0; transform: none !important; }
  .grid-column { gap: 40px; }
  
  .hero-container { height: 60vh; }
}
</style>