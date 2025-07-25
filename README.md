# Club Almacén+ - Plataforma Interactiva

Una aplicación web completa para almaceneros que permite ganar puntos por compartir información de su negocio y canjear premios.

## 🚀 Características

### Funcionalidades Principales
- **Sistema de Autenticación**: Registro e inicio de sesión funcional
- **Dashboard Interactivo**: Panel de control con estadísticas en tiempo real
- **Sistema de Desafíos**: Completa misiones para ganar puntos
- **Canje de Premios**: Intercambia puntos por beneficios reales
- **Perfil de Usuario**: Gestiona tu información personal y del negocio
- **Actividad en Tiempo Real**: Historial de acciones y puntos ganados

### Experiencia de Usuario
- **Interfaz Moderna**: Diseño responsive con animaciones fluidas
- **Navegación Intuitiva**: Flujo de usuario optimizado
- **Notificaciones**: Feedback visual para todas las acciones
- **Persistencia de Datos**: Información guardada en localStorage

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router

## 📱 Páginas y Funcionalidades

### 1. Landing Page (`/`)
- Presentación del Club Almacén+
- Botones funcionales de registro y demo
- Información sobre beneficios y desafíos

### 2. Registro (`/register`)
- Formulario completo de registro
- Validación en tiempo real
- Navegación automática al dashboard

### 3. Login (`/login`)
- Autenticación de usuarios
- Opción de login con Google
- Redirección al dashboard

### 4. Dashboard (`/dashboard`)
- **Resumen**: Vista general con estadísticas
- **Desafíos**: Lista de misiones disponibles
- **Premios**: Catálogo de recompensas
- **Actividad**: Historial de acciones

#### Funcionalidades Interactivas del Dashboard:
- **Completar Desafíos**: Subir fotos, reportar precios, responder encuestas
- **Canjear Premios**: Intercambiar puntos por beneficios
- **Ver Estadísticas**: Puntos, nivel, ranking, miembros
- **Gestionar Perfil**: Acceso directo al perfil de usuario

### 5. Perfil (`/profile`)
- Edición de información personal
- Gestión de datos del negocio
- Configuración de seguridad
- Estadísticas detalladas

## 🎮 Cómo Usar la Aplicación

### Para Nuevos Usuarios:
1. Visita la página principal
2. Haz clic en "Registrarse" o "¡Únete Ahora!"
3. Completa el formulario de registro
4. Accede automáticamente al dashboard

### Para Usuarios Existentes:
1. Haz clic en "Inicia sesión" desde la página principal
2. Ingresa tus credenciales
3. Accede a tu dashboard personal

### En el Dashboard:
1. **Ver Resumen**: Revisa tus estadísticas y desafíos activos
2. **Completar Desafíos**: 
   - Haz clic en "Participar" en cualquier desafío
   - Sigue las instrucciones (subir foto, reportar precios, etc.)
   - Recibe puntos automáticamente
3. **Canjear Premios**:
   - Ve a la pestaña "Premios"
   - Selecciona un premio disponible
   - Confirma el canje
4. **Gestionar Perfil**:
   - Haz clic en el ícono de configuración
   - Edita tu información personal y del negocio

## 🎯 Tipos de Desafíos

### 1. Foto de Estantería
- Sube fotos de productos específicos
- Gana 50 puntos por foto válida

### 2. Cargar Boleta
- Comparte boletas de compra
- Gana 30 puntos por boleta

### 3. Reportar Precios
- Actualiza precios de productos
- Gana 25 puntos por reporte

### 4. Encuestas
- Responde preguntas sobre tu experiencia
- Gana 15 puntos por encuesta

## 🎁 Catálogo de Premios

- **Recargas de Celular**: Desde $5.000
- **Gift Cards**: Jumbo, Falabella, etc.
- **Kits Promocionales**: Productos para el negocio
- **Equipamiento**: Estanterías, refrigeradores

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd club-almacen-plus

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en el navegador
open http://localhost:3000
```

## 📊 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── register/
│   │   └── page.tsx          # Página de registro
│   ├── login/
│   │   └── page.tsx          # Página de login
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard principal
│   └── profile/
│       └── page.tsx          # Página de perfil
├── components/
│   └── ui/
│       ├── Button.tsx        # Componente de botón
│       └── Notification.tsx  # Componente de notificación
└── lib/
    └── utils.ts              # Utilidades
```

## 🎨 Características de Diseño

- **Responsive Design**: Optimizado para móviles y desktop
- **Animaciones**: Transiciones suaves con Framer Motion
- **Gradientes**: Paleta de colores moderna
- **Microinteracciones**: Feedback visual en todas las acciones
- **Accesibilidad**: Navegación por teclado y lectores de pantalla

## 🔐 Seguridad

- Validación de formularios en frontend
- Sanitización de datos de entrada
- Persistencia segura en localStorage
- Protección contra XSS básica

## 🚀 Próximas Funcionalidades

- [ ] Backend con base de datos real
- [ ] Autenticación con JWT
- [ ] Subida de archivos a cloud storage
- [ ] Notificaciones push
- [ ] Chat en vivo con soporte
- [ ] API para integración con otros sistemas
- [ ] Panel de administración
- [ ] Analytics y reportes

## 📞 Soporte

Para soporte técnico o preguntas sobre la aplicación, contacta al equipo de desarrollo.

---

**Club Almacén+** - Conectando almaceneros con marcas para crear valor mutuo.
