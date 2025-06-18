# Aplicación de Autenticación con Firebase

## Descripción

Aplicación React que permite el registro e inicio de sesión de usuarios utilizando Firebase Authentication. Soporta múltiples proveedores de autenticación (email/contraseña, Google y Github) y permite la vinculación de cuentas.

## Configuración del Proyecto

### Requisitos Previos

- Node.js (v18 o superior)
- pnpm
- Cuenta de Firebase

### Configuración de Firebase

1. Crea un nuevo proyecto en la [Consola de Firebase](https://console.firebase.google.com/)
2. Registra tu aplicación web en Firebase
3. Habilita los métodos de autenticación deseados en la sección Authentication > Sign-in method
   - Email/Contraseña
   - Google
   - Github
4. Configura los dominios autorizados en Authentication > Settings
5. Obtén tu configuración de Firebase y configúrala en el archivo `.env`

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente información:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

Puedes revisar el archivo `.env.example` para ver un ejemplo de cómo debe verse el archivo `.env`.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone [url-del-repositorio]
   cd firebase-auth
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   pnpm install
   ```

3. Inicia la aplicación en modo desarrollo:

   ```bash
   npm run dev
   # o
   pnpm dev
   ```

## Tecnologías Utilizadas

- React 19
- TypeScript
- Firebase Authentication
- React Router
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Shadcn UI

## Fecha de Entrega

Lunes 09 de junio de 2025

## Notas Adicionales

- Asegúrate de configurar correctamente las reglas de seguridad de Firebase
- No olvides configurar las URLs de redirección en la consola de Firebase
- Mantén tus credenciales de Firebase seguras y no las expongas en el código fuente

## Historial de Versiones

### Versión 2.0 - 13 de Junio de 2025

#### 🚀 Nuevas Funcionalidades

##### Gestión de Perfiles de Usuario

- Sistema completo de perfiles de usuario con integración a Firestore
- Formularios para crear y editar perfiles de usuario con validación completa
- Página de visualización de perfil con información detallada del usuario
- Flujo de completar registro para nuevos usuarios autenticados
- Repositorio de usuarios con operaciones CRUD (crear, leer, actualizar, eliminar)

##### Componentes de UI Ampliados

- 15+ nuevos componentes de interfaz reutilizables (Accordion, Alert Dialog, Avatar, Calendar, Carousel, etc.)
- Componentes especializados para estados de carga y error
- Botones de carga inteligentes para mejor experiencia de usuario
- Contenedores centrados y componentes de navegación mejorados

#### 🔧 Mejoras Técnicas

##### Arquitectura y Organización

- Nueva capa de repositorios para abstracción de datos de Firestore
- Contexto de repositorios para inyección de dependencias
- Interfaces TypeScript para acciones de usuario y servicios de autenticación
- Hooks personalizados para gestión de perfiles y acciones de usuario
- Manejo de errores mejorado con handlers específicos por dominio

##### Herramientas de Desarrollo

- Configuración actualizada de ESLint con reglas modernas
- Integración de Prettier para formateo consistente de código
- Archivo `.editorconfig` para normalización entre editores
- Configuración mejorada de Vite para mejor compatibilidad

##### Validación y Tipos

- Esquemas Zod ampliados para validación de datos de usuario
- Tipos TypeScript actualizados para soporte de perfiles extendidos
- Validación de campos de dirección y fecha de nacimiento

#### 📝 Páginas y Rutas Nuevas

- `/complete-registration` - Completar información de perfil después del registro
- `/profile` - Visualizar perfil de usuario actual
- `/profile/edit` - Editar información de perfil

#### 🎨 Experiencia de Usuario

- Estados de carga consistentes en toda la aplicación
- Manejo mejorado de errores con mensajes informativos
- Formularios reactivos con validación en tiempo real
- Iconos de proveedores de autenticación mejorados

Esta actualización transforma la aplicación de un sistema básico de autenticación a una plataforma completa de gestión de usuarios con perfiles detallados y una arquitectura escalable.
