<template>
  <div class="map-wrapper">
    <div id="google-map" class="map-canvas"></div>
    <div class="map-overlay-shadow"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// TU CLAVE DE API
const apiKey = 'AIzaSyCepmnnMYIlg5qWBPofm-W0wZ7YQn2jYj4'; 

const initMap = async () => {
  setOptions({
    apiKey: apiKey,
    version: "weekly",
  });

  try {
    // 1. Importamos las librerías necesarias
    const { Map } = await importLibrary("maps");
    const { Marker } = await importLibrary("marker"); // Usamos 'Marker' clásico en vez de AdvancedMarkerElement

    const position = { lat: -27.094061, lng: -61.084762 };

    // Estilo Oscuro (Dark Mode)
    const darkStyle = [
      { elementType: "geometry", stylers: [{ color: "#212121" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
      { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
      { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
      { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }
    ];

    // 2. Inicializamos el mapa (SIN mapId para evitar errores)
    const map = new Map(document.getElementById("google-map"), {
      center: position,
      zoom: 16,
      styles: darkStyle,
      disableDefaultUI: true, // Quita botones satélite/calle
      zoomControl: true,      // Deja solo el +/-
      backgroundColor: "#050505"
    });

    // 3. Marcador Clásico (Siempre funciona)
    new Marker({
      position: position,
      map: map,
      title: "Gimnasio Abito",
      // Icono por defecto de Google (Rojo) para asegurar que se vea
      // Si quieres uno personalizado, descomenta la línea de abajo y pon una URL de imagen
      // icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" 
    });

  } catch (error) {
    console.error("Error cargando Google Maps:", error);
  }
};

onMounted(() => {
  initMap();
});
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  /* Aseguramos altura mínima para que el div tenga tamaño */
  min-height: 500px; 
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #333;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  background-color: #111;
}

.map-canvas { width: 100%; height: 100%; min-height: 500px; }

.map-overlay-shadow {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
  pointer-events: none;
  z-index: 2;
}
</style>