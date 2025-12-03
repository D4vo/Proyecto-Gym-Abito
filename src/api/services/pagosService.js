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
}
};