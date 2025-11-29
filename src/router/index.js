import { createRouter, createWebHistory } from 'vue-router'
import PantallaInicio from '../views/PantallaInicio.vue'
import LoginView from '../views/LoginView.vue'
import PantallaUsuario from '../views/PantallaUsuario.vue'
import PantallaAdmin from '@/views/PantallaAdmin.vue'
import PantallaPersona from '@/views/PantallaPersona.vue'
import PantallaEmpleado from '@/views/PantallaEmpleado.vue'
import RegistroFinalView from '@/views/RegistroFinalView.vue'
import RecuperarView from '@/views/RecuperarView.vue'
// Funciones del storage
import { getToken, getUser } from '@/api/storage/userStorage'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: PantallaInicio
  },
    {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Usuario',
    name: 'PantallaUsuario',  
    component: PantallaUsuario,
    meta: { requiresAuth: true, isAdmin: false }
  },
  {
    path: '/Admin',
    name: 'PantallaAdmin',
    component: PantallaAdmin,
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/Persona',
    name: 'PantallaPersona',
    component: PantallaPersona,
    meta: { requiresAuth: true, isAdmin: false }
  }
  ,
  {
    path: '/Empleado',
    name: 'PantallaEmpleado',
    component: PantallaEmpleado,
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/completar-registro', // Esta es la URL a la que llegará el usuario desde el correo
    name: 'completar-registro',
    component: RegistroFinalView,
    props: route => ({ token: route.query.token }) // Pasamos el token como prop a la vista
  }
  ,
  {
    path: '/Recuperacion',
    name: 'RecuperarContraseña',
    component: RecuperarView,
    // No ponemos requiresAuth porque el usuario viene del mail 
    // y técnicamente aún no inició sesión.
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation Guard Global
router.beforeEach((to, from, next) => {
  const loggedIn = !!getToken();
  const user = getUser();

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Si el usuario NO está logueado, redirige al login
    if (!loggedIn) {
      next({ name: 'login' });
    } else {
      // Si está logueado, verifica el rol (isAdmin)
      const isAdminRoute = to.meta.isAdmin;
      const userIsAdmin = user && user.esAdmin;

      if (isAdminRoute && !userIsAdmin) {
        // Si intenta acceder a una ruta de admin sin serlo, redirige a /usuario
        next({ name: 'PantallaUsuario' });
      } else if (!isAdminRoute && userIsAdmin) {
        // Si un admin intenta acceder a una ruta de usuario, redirige a /admin
        next({ name: 'PantallaAdmin' });
      } else {
        // Si tiene el rol correcto, permite el acceso
        next();
      }
    }
  } else {
    // Si la ruta no requiere autenticación, permite el acceso
    next();
  }
});

export default router
