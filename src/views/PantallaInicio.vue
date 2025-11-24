<template>
  <div class="main-wrapper" ref="mainContainer">
    
    <div class="bg-pattern-fixed"></div>

    <div class="hero-container">
      <div class="hero-parallax-layer" :style="{ transform: `translateY(${scrollY * 0.5}px)` }">
        <FondoInicio />
      </div>
      <div class="hero-gradient-overlay bottom"></div>
    </div>

    <section id="metodologias" class="section-container methods-section pattern-bg z-5">
      <div class="methods-top-gradient"></div>

      <div class="content-limit force-relative">
        <div class="header-group reveal-on-scroll">
          <span class="brand-tag">NUESTRO SISTEMA</span>
          <h2 class="brand-title">PERFORMANCE</h2>
          <div class="title-decoration"></div>
        </div>
        
        <div class="staggered-grid">
          <div class="column-left">
             <Metodologia
              v-for="(item, index) in metodologiasPares"
              :key="item.id || index"
              :metodo="item"
              :index="(index * 2) + 1" 
              class="reveal-on-scroll card-spacer"
            />
          </div>
          
          <div class="column-right" :style="{ transform: `translateY(-${scrollY * 0.06}px)` }">
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

    <div class="prices-layer-wrapper z-10 pattern-bg">
      
      <div class="double-marquee-container">
        <div class="marquee-row">
          <div class="track-left">
            <div class="content">START NOW • NO EXCUSES • PURE GRIND • START NOW • NO EXCUSES • PURE GRIND •</div>
            <div class="content" aria-hidden="true">START NOW • NO EXCUSES • PURE GRIND • START NOW • NO EXCUSES • PURE GRIND •</div>
          </div>
        </div>
        <div class="marquee-row">
          <div class="track-right">
            <div class="content outline-text">YOUR BODY • YOUR RULES • LEVEL UP • YOUR BODY • YOUR RULES • LEVEL UP •</div>
            <div class="content outline-text" aria-hidden="true">YOUR BODY • YOUR RULES • LEVEL UP • YOUR BODY • YOUR RULES • LEVEL UP •</div>
          </div>
        </div>
      </div>

      <section id="historia" class="content-limit wide-limit section-spacing">
        <div class="header-group reveal-on-scroll">
          <span class="brand-tag">NUESTRA</span>
          <h2 class="brand-title">HISTORIA</h2>
          <div class="title-decoration"></div>
          <p class="brand-subtitle">SIEMPRE CON VOS</p>
        </div>
        </section>
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

      <section id="precios" class="content-limit wide-limit prices-content">
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
      </section>
      <div class="rhythm-marquee">
        <div class="marquee-track">
          <div class="marquee-content">
            <span class="solid">FOCUS</span> <span class="separator">///</span>
            <span class="outline">STRENGTH</span> <span class="separator">///</span>
            <span class="solid">PASSION</span> <span class="separator">///</span>
            <span class="outline">ENERGY</span> <span class="separator">///</span>
            <span class="solid">LIMITLESS</span> <span class="separator">///</span>
            <span class="outline">POWER</span> <span class="separator">///</span>
          </div>
          <div class="marquee-content" aria-hidden="true">
            <span class="solid">FOCUS</span> <span class="separator">///</span>
            <span class="outline">STRENGTH</span> <span class="separator">///</span>
            <span class="solid">PASSION</span> <span class="separator">///</span>
            <span class="outline">ENERGY</span> <span class="separator">///</span>
            <span class="solid">LIMITLESS</span> <span class="separator">///</span>
            <span class="outline">POWER</span> <span class="separator">///</span>
          </div>
        </div>
      </div>
      
      <section id="ubicacion" class="content-limit wide-limit section-spacing">
        <div class="location-grid">
          
          <div class="location-text reveal-on-scroll">
            <div class="header-align-left">
              <span class="brand-tag-left">UBICACIÓN</span>
              <h2 class="brand-title-left">DONDE ESTAMOS?</h2>
              <div class="title-decoration-left"></div>
            </div>
            
            <p class="location-description">
              Estamos ubicados en <strong>Calle 9 de Julio 1355</strong>, un punto estratégico para tu entrenamiento. 
              Nos encontramos a tan solo <strong>5 cuadras de la Avenida Principal Gral. Jones</strong>, con fácil acceso y estacionamiento cercano.
            </p>
            
            <div class="location-details">
              <div class="detail-item">
                <i class="fas fa-clock"></i>
                <div>
                  <h4>Horarios</h4>
                  <span>Lunes a Viernes: 08:00 - 22:00</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-phone-alt"></i>
                <div>
                  <h4>Contacto</h4>
                  <span>+54 9 3731 407828</span>
                </div>
              </div>
            </div>
          </div>

          <div class="location-map reveal-on-scroll">
             <MapaUbicacion />
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
// IMPORTANTE: Importar el mapa correctamente
import MapaUbicacion from '@/components/Inicio/MapaUbicacion.vue'

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
/* BASE */
.main-wrapper { background-color: #050505; color: #fff; font-family: 'Poppins', sans-serif; overflow: visible; position: relative; }
.content-limit { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }
.wide-limit { max-width: 1400px; }
.z-5 { z-index: 5; }
.z-10 { z-index: 10; }
.force-relative { position: relative; z-index: 2; }

/* HERO */
.hero-container { position: relative; width: 100%; height: 100vh; overflow: hidden; z-index: 1; background-color: #050505; }
.hero-parallax-layer { width: 100%; height: 120%; position: absolute; top: 0; left: 0; will-change: transform; }
.hero-gradient-overlay.bottom { position: absolute; bottom: 0; left: 0; width: 100%; height: 120px; background: linear-gradient(to bottom, transparent 0%, #050505 100%); pointer-events: none; z-index: 3; }

/* PATTERN */
.pattern-bg { background-color: #050505; background-image: radial-gradient(#222 1px, transparent 1px); background-size: 30px 30px; }

/* METODOLOGÍAS */
.methods-section { position: relative; padding-top: 150px; padding-bottom: 150px; z-index: 5; }
.methods-top-gradient { position: absolute; top: 0; left: 0; width: 100%; height: 200px; background: linear-gradient(to bottom, #050505 0%, transparent 100%); pointer-events: none; z-index: 1; }
.header-group { text-align: center; margin-bottom: 80px; display: flex; flex-direction: column; align-items: center; }
.brand-tag { color: #e50914; font-size: 0.8rem; font-weight: 700; letter-spacing: 3px; margin-bottom: 10px; text-transform: uppercase; }
.brand-title { font-size: 4rem; font-weight: 800; letter-spacing: -2px; color: #fff; margin: 0; text-transform: uppercase; line-height: 1; }
.title-decoration { width: 80px; height: 4px; background-color: #e50914; margin-top: 20px; }
.staggered-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
.card-spacer { margin-bottom: 40px; }
.column-right { margin-top: 100px; will-change: transform; }

/* CAPA INFERIOR (WRAPPER GRANDE) */
.prices-layer-wrapper { position: relative; display: flex; flex-direction: column; min-height: 100vh; }
.section-spacing { padding: 80px 0; }

/* --- UBICACIÓN GRID (AQUÍ ESTÁ LA CLAVE) --- */
.location-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 50% Texto - 50% Mapa */
  gap: 60px; /* Espacio entre las dos columnas */
  align-items: center; /* Centrado vertical perfecto */
  width: 100%;
}

.location-text {
  text-align: left; /* Texto alineado a la izquierda */
}

/* Estilos específicos para los títulos de ubicación (Alineados a la izq) */
.header-align-left { align-items: flex-start; text-align: left; display: flex; flex-direction: column; margin-bottom: 20px; }
.brand-tag-left { color: #e50914; font-size: 0.8rem; font-weight: 700; letter-spacing: 3px; margin-bottom: 10px; text-transform: uppercase; }
.brand-title-left { font-size: 3.5rem; font-weight: 800; letter-spacing: -2px; color: #fff; margin: 0; text-transform: uppercase; line-height: 1; }
.title-decoration-left { width: 80px; height: 4px; background-color: #e50914; margin-top: 20px; }

.location-description { font-size: 1.1rem; color: #ccc; line-height: 1.8; margin-bottom: 40px; max-width: 95%; }
.location-description strong { color: #fff; font-weight: 600; }
.location-details { display: flex; flex-direction: column; gap: 25px; margin-bottom: 40px; }
.detail-item { display: flex; align-items: flex-start; gap: 15px; }
.detail-item i { color: #e50914; font-size: 1.5rem; margin-top: 5px; }
.detail-item h4 { margin: 0 0 5px; font-size: 1rem; text-transform: uppercase; color: #fff; letter-spacing: 1px; }
.detail-item span { display: block; font-size: 0.95rem; color: #999; }

.location-map {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* MARQUEES */
.double-marquee-container { padding: 60px 0; background-color: transparent; overflow: hidden; display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 2; }
.marquee-row { display: flex; width: 100%; overflow: hidden; white-space: nowrap; }
.track-left { display: flex; animation: scrollLeft 25s linear infinite; }
.track-right { display: flex; animation: scrollRight 25s linear infinite; }
.content { font-family: 'Poppins', sans-serif; font-size: 4rem; font-weight: 900; text-transform: uppercase; color: #fff; padding-right: 40px; line-height: 1; }
.outline-text { color: transparent; -webkit-text-stroke: 2px #333; transition: -webkit-text-stroke 0.3s ease; }
.double-marquee-container:hover .outline-text { -webkit-text-stroke: 2px #e50914; }

.rhythm-marquee { background: transparent; border-top: 1px solid rgba(255, 255, 255, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding: 25px 0; overflow: hidden; position: relative; z-index: 2; margin: 80px 0; }
.solid { font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 900; color: #fff; line-height: 1; }
.outline { font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 900; color: transparent; -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5); line-height: 1; }
.separator { color: #e50914; font-size: 1.5rem; font-weight: 300; opacity: 0.8; margin: 0 20px; }

.marquee-wrapper { background: #e50914; padding: 20px 0; transform: skewY(-2deg); width: 100%; overflow: hidden; border-top: 2px solid #fff; border-bottom: 2px solid #fff; margin-bottom: 80px; position: relative; z-index: 11; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.marquee-track { display: flex; width: fit-content; animation: scroll 30s linear infinite; }
.marquee-content { white-space: nowrap; font-size: 1.4rem; font-weight: 900; color: #000; letter-spacing: 2px; padding-right: 50px; }

@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
@keyframes scrollRhythm { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* PRECIOS */
.prices-content { padding-top: 50px; padding-bottom: 150px; }
.brand-subtitle { font-size: 1rem; color: #aaa; letter-spacing: 4px; text-transform: uppercase; margin-top: 15px; font-weight: 600; }
.pricing-flex { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; }
.pricing-item { flex: 1 1 280px; max-width: 340px; min-width: 260px; }

.reveal-on-scroll { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.215, 0.610, 0.355, 1); }
.reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .brand-title { font-size: 2.5rem; }
  .staggered-grid { grid-template-columns: 1fr; gap: 40px; }
  .column-right { margin-top: 0; transform: none !important; }
  .hero-container { height: 60vh; }
  
  /* En móvil cambiamos a una sola columna */
  .location-grid { grid-template-columns: 1fr; gap: 40px; }
  .location-text { order: 2; } /* Texto abajo */
  .location-map { order: 1; } /* Mapa arriba */
  
  .content { font-size: 2.5rem; }
  .solid, .outline { font-size: 2.2rem; }
}
</style>