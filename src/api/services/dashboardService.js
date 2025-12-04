// src/api/services/horarioService.js
import apiClient from '../index'; // Importa la instancia centralizada de Axios

/**
 * Obtiene la lista completa de horarios con sus días asignados,
 * capacidad, empleados y alumnos inscritos.
 * Requiere token de staff/admin (según tu API).
 */
export const obtenerHorariosCompletos = async () => {
    try {
        // Llama al endpoint GET /horarios/ de tu API
        const response = await apiClient.get('/horarios/');
        
        // Devuelve el array con los datos de los horarios
        return response.data;
    } catch (error) {
        console.error("Error al obtener los horarios completos:", error.response?.data || error.message);
        // Devuelve un array vacío en caso de error para que la UI no falle
        return []; 
    }
};

export const obtenerOcupacionTotal = async () => {
    try {
        const response = await apiClient.get('/admin/estadisticas/alumnos-por-trabajo');
        return response.data;
    } catch (error) {
        console.error("Error en la carga de datos de las metodologias:", error.response?.data  || error.message);
        return [];
    }
}

export const obtenerKPIs = async () => {
    try {
        const response = await apiClient.get('/admin/kpis');
        return response.data;
    } catch (error) {
        console.error("Error al obtener KPIs:", error);
        throw error; // Re-lanzamos para manejarlo en la vista si es necesario
    }
};

export const obtenerAlumnosPorTurno = async () => {
    try {
        const response = await apiClient.get('/admin/alumnos-turno');
        return response.data;
    } catch (error) {
        console.error("Error al obtener alumnos por turno:", error);
        throw error;
    }
};

export const obtenerRendimientoStaff = async () => {
    try {
        const response = await apiClient.get('/admin/rendimiento-staff');
        return response.data;
    } catch (error) {
        console.error("Error al obtener rendimiento staff:", error);
        return []; // Retornar array vacío en caso de error para no romper la UI
    }
};

