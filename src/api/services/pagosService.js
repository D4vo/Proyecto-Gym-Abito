// src/api/services/pagosService.js
import apiClient from '../index'; // O la ruta donde tengas tu instancia de axios

export default {
  /**
   * Llama al backend para crear la preferencia de pago de una cuota
   * @param {Number} idCuota - El ID de la cuota a pagar
   * @returns {Promise<Object>} - Retorna el objeto con init_point y sandbox_init_point
   */
  async iniciarPago(idCuota) {
    try {
        // Llamamos a la ruta que creamos en el backend
        const response = await apiClient.post(`/pagos/crear-preferencia/${idCuota}`);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar pago:', error);
        throw error;
    }
  },

  /**
   * Consulta si una cuota ya está pagada
   * @param {Number} idCuota 
   * @returns {Promise<Boolean>}
   */
  async verificarEstadoPago(idCuota) {
    try {
      // Ajusta la ruta si tu endpoint de cuotas tiene otro prefijo (ej: /cuotas)
      // Asumo que tienes un endpoint de cuotas, si no, usa axios directo
      const response = await apiClient.get(`/pagos/${idCuota}/estado`);
      return response.data;
    } catch (error) {
      console.error('Error verificando estado:', error);
      return false;
    }
  }
};

export const verComprobante = async (idCuota) => {
    try {
        const response = await apiClient.get(`/pagos/comprobante/${idCuota}`, {
            responseType: 'blob' // ¡Crucial! Indica que esperamos un archivo
        });
        
        // Crear una URL temporal para el archivo PDF
        const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        
        // Abrir en nueva pestaña
        window.open(pdfUrl, '_blank');
        
        // Opcional: Liberar memoria después de un tiempo
        // setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 10000);
        
    } catch (error) {
        console.error("Error al descargar comprobante:", error);
        throw error;
    }
};
