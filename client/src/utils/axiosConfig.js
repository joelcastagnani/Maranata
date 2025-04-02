import axios from 'axios';

// Crear una instancia de axios para configurar globalmente las solicitudes
const api = axios.create({
  baseURL: "http://localhost:8080", // Asegúrate de que esta sea la URL base de tu API
});

// Agregar un interceptor para añadir el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (token) {
      // Si el token está presente, añadirlo al header Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Continuar con la solicitud
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; // Exporta la instancia de axios configurada
