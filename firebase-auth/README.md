# Aplicación de Autenticación con Firebase y Sistema de Posts

## Descripción

Aplicación React completa que permite el registro e inicio de sesión de usuarios utilizando Firebase Authentication, gestión de perfiles de usuario y un sistema completo de publicaciones (posts). Soporta múltiples proveedores de autenticación (email/contraseña, Google y Github), permite la vinculación de cuentas, y ofrece funcionalidades de red social básicas.

## 🚀 Características Principal

### 🔐 Sistema de Autenticación

- **Múltiples proveedores**: Email/contraseña, Google, GitHub
- **Vinculación de cuentas**: Conecta diferentes métodos de autenticación
- **Recuperación de contraseña**: Sistema seguro de restablecimiento
- **Validación en tiempo real**: Formularios reactivos con feedback inmediato

### 👤 Gestión de Perfiles

- **Perfiles completos**: Información detallada del usuario
- **Edición de perfil**: Formularios intuitivos para actualizar datos
- **Validación robusta**: Esquemas Zod para integridad de datos
- **Estados de carga**: UX optimizada con feedback visual

### 📝 Sistema de Posts

- **Crear publicaciones**: Editor con diálogo modal para mejor UX
- **Gestión personal**: Ver, crear y eliminar posts propios
- **Validación completa**: Contenido y título validados
- **Estados reactivos**: Loading states y manejo de errores
- **Interfaz moderna**: Componentes shadcn/ui para mejor accesibilidad

## Configuración del Proyecto

### Requisitos Previos

- Node.js (v18 o superior)
- pnpm (recomendado) o npm
- Cuenta de Firebase

### Configuración de Firebase

1. **Crear proyecto**: Nuevo proyecto en la [Consola de Firebase](https://console.firebase.google.com/)
2. **Registrar aplicación**: Registra tu aplicación web en Firebase
3. **Configurar Authentication**:
   - Habilita Email/Contraseña
   - Configura Google OAuth (opcional)
   - Configura GitHub OAuth (opcional)
4. **Configurar Firestore**:
   - Crear base de datos Firestore
   - Configurar reglas de seguridad básicas
5. **Dominios autorizados**: Agregar dominios en Authentication > Settings
6. **Obtener configuración**: Copiar credenciales para archivo `.env`

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> 💡 **Tip**: Revisa el archivo `.env.example` para ver el formato exacto requerido.

### Reglas de Firestore

Configura las siguientes reglas de seguridad en Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para usuarios
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Reglas para posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null &&
                   request.auth.uid == resource.data.authorUID;
      allow update, delete: if request.auth != null &&
                           request.auth.uid == resource.data.authorUID;
    }
  }
}
```

## Instalación

1. **Clonar repositorio**:

   ```bash
   git clone [url-del-repositorio]
   cd firebase-auth
   ```

2. **Instalar dependencias**:

   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configurar variables de entorno**:

   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales de Firebase
   ```

4. **Iniciar desarrollo**:

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

## 🛠️ Tecnologías y Dependencias

### Core

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### Firebase

- **Firebase Authentication** - Sistema de autenticación
- **Cloud Firestore** - Base de datos NoSQL
- **Firebase SDK** - Integración completa

### UI/UX

- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes accesibles
- **Lucide React** - Iconografía moderna
- **React Hook Form** - Manejo de formularios

### Estado y Navegación

- **React Router** - Enrutamiento SPA
- **Context API** - Gestión de estado global
- **Custom Hooks** - Lógica reutilizable

### Validación y Utilidades

- **Zod** - Validación de esquemas
- **Sonner** - Notificaciones toast
- **date-fns** - Manipulación de fechas

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```text
src/
├── apps/                    # Configuración de Firebase
├── components/             # Componentes React
│   ├── auth/              # Componentes de autenticación
│   ├── features/          # Características específicas
│   ├── layout/            # Componentes de diseño
│   ├── ui/                # Componentes base (shadcn/ui)
│   └── user/              # Componentes de usuario y posts
├── contexts/              # Contextos de React
├── error-handlers/        # Manejo centralizado de errores
├── hooks/                 # Custom hooks
│   ├── auth/             # Hooks de autenticación
│   ├── post/             # Hooks de posts
│   └── user/             # Hooks de usuario
├── interfaces/            # Interfaces TypeScript
│   ├── auth/             # Interfaces de autenticación
│   ├── post/             # Interfaces de posts
│   └── user/             # Interfaces de usuario
├── layouts/               # Layouts de páginas
├── lib/                   # Utilidades y helpers
├── pages/                 # Páginas de la aplicación
│   ├── _auth/            # Páginas de autenticación
│   ├── _error/           # Páginas de error
│   ├── _protected/       # Páginas protegidas
│   └── _public/          # Páginas públicas
├── repositories/          # Capa de acceso a datos
├── routes/                # Configuración de rutas
├── schemas/               # Esquemas de validación Zod
├── services/              # Servicios de negocio
└── types/                 # Tipos TypeScript
```

### Patrón de Arquitectura

La aplicación sigue principios de **Clean Architecture** y **Hexagonal Architecture**:

1. **Presentación** (`components/`, `pages/`) - Interfaz de usuario
2. **Dominio** (`hooks/`, `interfaces/`) - Lógica de negocio
3. **Infraestructura** (`repositories/`, `services/`) - Acceso a datos
4. **Aplicación** (`contexts/`, `routes/`) - Coordinación

## 📝 Funcionalidades Detalladas

### Sistema de Autenticación

#### Flujos Implementados

- **Registro**: Validación, creación de cuenta, perfil automático
- **Inicio de sesión**: Múltiples proveedores, remember me
- **Recuperación**: Email de restablecimiento de contraseña
- **Vinculación**: Conectar múltiples métodos de auth

#### Componentes Clave

- `LoginForm` - Formulario de inicio de sesión
- `RegisterForm` - Registro de nuevos usuarios
- `LinkPasswordForm` - Vinculación de contraseña
- `ProviderIcon` - Iconos de proveedores OAuth

### Gestión de Perfiles

#### Funcionalidades

- **Crear perfil**: Formulario completo post-registro
- **Ver perfil**: Página de información personal
- **Editar perfil**: Actualización de datos en tiempo real
- **Validación**: Campos requeridos y formato correcto

#### Campos del Perfil

- Información básica (nombre, apellido, email)
- Datos personales (fecha nacimiento, dirección)
- Metadatos (fechas de creación/actualización)

### Sistema de Posts

#### Características

- **Crear posts**: Modal con formulario validado
- **Listar posts**: Vista cronológica de publicaciones
- **Eliminar posts**: Confirmación y feedback visual
- **Estados reactivos**: Loading, error y vacío

#### Flujo de Trabajo

1. **Creación**: Modal → Validación → Firestore → Actualización UI
2. **Lectura**: Carga automática → Parse seguro → Estado local
3. **Eliminación**: Confirmación → Firestore → Actualización optimista

#### Componentes

- `CreatePostDialog` - Modal para crear posts
- `UserPostsManager` - Gestión completa de posts
- `useUserPosts` - Hook de estado y acciones

## 🔧 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev             # Servidor de desarrollo
pnpm build           # Build de producción
pnpm preview         # Preview del build
pnpm lint            # Linting con ESLint
pnpm type-check      # Verificación de tipos

# Testing (futuro)
pnpm test            # Ejecutar tests
pnpm test:watch      # Tests en modo watch
```

### Configuración de Desarrollo

#### ESLint y Prettier

```json
{
  "extends": ["@eslint/js", "@typescript-eslint", "react-hooks"],
  "rules": {
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

#### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}
```

### Convenciones de Código

#### Naming Conventions

- **Componentes**: PascalCase (`UserProfile`)
- **Hooks**: camelCase con `use` prefix (`useUserPosts`)
- **Tipos**: PascalCase (`CreatePostData`)
- **Interfaces**: PascalCase con `I` prefix (`IUserRepository`)

#### Estructura de Archivos

- Un componente por archivo
- Exports named para funciones, default para componentes principales
- Interfaces en archivos separados cuando son compartidas

## 🚦 Estados y Manejo de Errores

### Estados de Carga

```typescript
interface LoadingStates {
  loading: boolean;      // Carga general
  creating: boolean;     // Creando recurso
  deleting: string | null; // ID del recurso siendo eliminado
  updating: boolean;     // Actualizando recurso
}
```

### Manejo de Errores

- **Error Boundaries**: Captura errores de componentes
- **Error Handlers**: Manejo específico por dominio
- **Toast Notifications**: Feedback visual al usuario
- **Retry Logic**: Reintentos automáticos en fallos de red

### Validación

```typescript
// Ejemplo de esquema Zod
const postSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  authorUID: z.string(),
  authorEmail: z.string().email(),
  createdAt: z.date()
});
```

## 📚 Guías de Uso

### Agregar Nueva Funcionalidad

1. **Definir tipos** en `src/types/`
2. **Crear esquemas** de validación en `src/schemas/`
3. **Implementar repositorio** en `src/repositories/`
4. **Crear hooks** en `src/hooks/`
5. **Desarrollar componentes** en `src/components/`
6. **Integrar en páginas** en `src/pages/`

### Agregar Nuevo Proveedor OAuth

1. Configurar en Firebase Console
2. Actualizar `authProviders` en `src/providers/auth.providers.ts`
3. Agregar icono en `src/assets/logos/`
4. Actualizar `ProviderIcon` component

### Personalizar UI

1. **Colores**: Modificar `tailwind.config.js`
2. **Componentes**: Extender componentes shadcn/ui
3. **Temas**: Implementar context de tema
4. **Responsive**: Usar breakpoints de Tailwind

## 🚀 Deployment

### Preparación

```bash
# Build de producción
pnpm build

# Verificar build
pnpm preview
```

### Variables de Producción

Configurar las mismas variables de entorno en tu plataforma de hosting:

- Vercel: Dashboard → Project → Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Firebase Hosting: `firebase functions:config:set`

### Optimizaciones

- **Bundle splitting**: Vite configurado automáticamente
- **Tree shaking**: Importaciones optimizadas
- **Asset optimization**: Imágenes y fonts optimizados
- **Code splitting**: Rutas lazy-loaded

## 📋 Historial de Versiones

### Versión 3.0 - 18 de Junio de 2025

#### 🚀 Nuevas Funcionalidades Principales

##### Sistema Completo de Posts

- **Creación de posts**: Modal dialog con validación completa usando shadcn/ui
- **Gestión personal**: CRUD completo para posts de usuario autenticado
- **Validación robusta**: Esquemas Zod para título (200 chars) y contenido (5000 chars)
- **Estados reactivos**: Loading, error y empty states optimizados
- **UX moderna**: Componente Textarea personalizado de shadcn/ui

##### Hook Personalizado `useUserPosts`

- **Estado centralizado**: Manejo completo del estado de posts del usuario
- **Acciones integradas**: Create, read, delete con feedback visual
- **Error handling**: Manejo específico de errores de posts
- **Loading states**: Estados granulares (loading, creating, deleting)
- **Auto-refresh**: Recarga automática y manual de posts

##### Arquitectura de Posts Escalable

- **Repository Pattern**: `PostRepository` con métodos CRUD completos
- **Error Handlers**: `CustomPostError` y manejo específico de Firebase
- **Interfaces TypeScript**: `IPostRepository` e `IPostActions` para abstracción
- **Validación completa**: Schemas para creación y posts completos
- **Integración Firestore**: Colección `posts` con queries optimizadas

#### 🔧 Mejoras de Arquitectura

##### Capa de Repositorios Extendida

- **PostRepository**: Repositorio concreto con validación y error handling
- **Inyección de dependencias**: Integrado en `RepositoriesProvider`
- **Principios SOLID**: Interfaces, abstracción y responsabilidad única
- **Validación en capas**: Repository + Schema + UI validation

##### Error Handling Especializado

- **PostErrorCode**: Códigos específicos para operaciones de posts
- **CustomPostError**: Clase de error extendida para posts
- **Manejo granular**: Diferentes tipos de errores Firebase y validación
- **Mensajes descriptivos**: Feedback claro para cada tipo de error

#### 📝 Componentes y UI

##### Nuevos Componentes de Posts

- **CreatePostDialog**: Modal con formulario completo y validación
- **UserPostsManager**: Gestión integral de posts de usuario
- **Textarea shadcn/ui**: Componente optimizado para contenido largo
- **Estados visuales**: Loading states, empty states y error states

##### Mejoras de UX

- **Modal responsivo**: Diseño adaptativo para diferentes pantallas
- **Validación en tiempo real**: Feedback inmediato en formularios
- **Estados de carga granulares**: Feedback específico por acción
- **Accesibilidad mejorada**: Componentes shadcn/ui optimizados

#### 🗃️ Estructura de Datos

##### Modelo de Posts

```typescript
interface Post {
  id: string;
  title: string;        // Máximo 200 caracteres
  content: string;      // Máximo 5000 caracteres
  authorUID: string;    // ID del usuario creador
  authorEmail: string;  // Email del autor
  createdAt: Date;      // Timestamp de creación
}
```

##### Esquemas de Validación

- **postSchema**: Validación completa de posts
- **createPostDataSchema**: Validación para creación (sin metadatos)
- **Reglas Zod**: Longitud, tipos y campos requeridos

#### 🔒 Seguridad y Permisos

##### Reglas de Firestore para Posts

- **Lectura**: Usuarios autenticados pueden leer todos los posts
- **Creación**: Solo usuarios autenticados pueden crear posts
- **Modificación/Eliminación**: Solo el autor puede modificar sus posts
- **Validación de autoría**: Verificación de `authorUID` en el servidor

#### 📊 Performance y Optimización

##### Optimizaciones Implementadas

- **Queries optimizadas**: `orderBy` y `where` para filtrado eficiente
- **Estados locales**: Gestión optimista de UI para mejor UX
- **Validación por capas**: Prevención de requests innecesarios
- **Component memoization**: Hooks optimizados con `useCallback`

### Versión 2.0 - 13 de Junio de 2025

#### 🚀 Gestión de Perfiles de Usuario

- Sistema completo de perfiles de usuario con integración a Firestore
- Formularios para crear y editar perfiles con validación completa
- Página de visualización de perfil con información detallada
- Flujo de completar registro para nuevos usuarios
- Repositorio de usuarios con operaciones CRUD

#### 🔧 Componentes de UI Ampliados

- 15+ nuevos componentes de interfaz reutilizables
- Componentes especializados para estados de carga y error
- Botones de carga inteligentes y contenedores centrados

#### 📝 Páginas y Rutas Nuevas

- `/complete-registration` - Completar perfil post-registro
- `/profile` - Visualizar perfil actual
- `/profile/edit` - Editar información de perfil

## 📞 Soporte y Contribución

### Reportar Issues

- Usar GitHub Issues con template descriptivo
- Incluir pasos para reproducir
- Especificar versión y entorno

### Contribuir

1. Fork del repositorio
2. Crear feature branch
3. Commits descriptivos
4. Pull request con descripción completa

### Contacto

- **Proyecto**: Sistema de Posts y Autenticación Firebase
- **Tecnología**: React + TypeScript + Firebase
- **Versión actual**: 3.0.0
- **Fecha de entrega**: Lunes 09 de junio de 2025

---

**🎯 Próximas funcionalidades planeadas:**

- Comentarios en posts
- Sistema de likes/reacciones
- Feed de posts de otros usuarios
- Búsqueda y filtrado de posts
- Categorías y tags para posts
