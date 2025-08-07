# Ponte Pilas - Aplicación Móvil

Esta es la aplicación móvil de **Ponte Pilas**, desarrollada con React Native y Expo para la seguridad ciudadana de Quito.

## 📱 Características

- **Autenticación de usuarios**: Login con email y contraseña
- **Interfaz diferenciada**: Menús específicos para usuarios y administradores
- **Integración con backend**: Conecta con la API REST del servidor
- **Navegación fluida**: Navegación stack con React Navigation
- **Almacenamiento local**: Persistencia de sesión con AsyncStorage

## 🚀 Configuración inicial

### Prerrequisitos

1. **Node.js** (versión 16 o superior)
2. **Expo CLI** instalado globalmente:
   ```bash
   npm install -g @expo/cli
   ```
3. **Expo Go** app instalada en tu celular (disponible en App Store / Google Play)

### Instalación

1. **Instalar dependencias**:
   ```bash
   cd movil
   npm install
   ```

2. **Configurar la URL del servidor**:
   - Abre el archivo `src/services/apiService.js`
   - Cambia `BASE_URL` por la IP de tu computadora:
   ```javascript
   const BASE_URL = 'http://TU_IP_LOCAL:8000';
   ```
   - Para encontrar tu IP local:
     - Windows: `ipconfig` en CMD
     - macOS/Linux: `ifconfig` en Terminal

## 🏃‍♂️ Ejecutar la aplicación

### 1. Iniciar el servidor backend

Primero, asegúrate de que el servidor backend esté corriendo:

```bash
# En la carpeta server/
cd ../server
npm start
```

### 2. Iniciar la aplicación móvil

```bash
# En la carpeta movil/
npm start
```

### 3. Probar en tu celular

1. **Instala Expo Go** en tu celular desde:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escanea el código QR** que aparece en la terminal o navegador

3. **La app se abrirá automáticamente** en Expo Go

## 📱 Funcionalidades implementadas

### ✅ Completado

- [x] Pantalla de bienvenida
- [x] Sistema de login
- [x] Navegación entre pantallas
- [x] Menú de usuario regular
- [x] Menú de administrador
- [x] Persistencia de sesión
- [x] Manejo de errores
- [x] Logout funcional

### 🚧 Próximamente

- [ ] Registro de usuarios
- [ ] Creación de reportes
- [ ] Visualización de reportes
- [ ] Notificaciones push
- [ ] Mapa interactivo
- [ ] Gestión de perfil

## 🔧 Estructura del proyecto

```
movil/
├── App.js                      # Componente principal
├── src/
│   ├── components/            # Componentes reutilizables
│   │   └── CustomButton.js
│   ├── screens/              # Pantallas de la app
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── MenuUsuarioScreen.js
│   │   ├── MenuAdminScreen.js
│   │   └── LoadingScreen.js
│   ├── services/             # Servicios de API
│   │   └── apiService.js
│   └── utils/                # Utilidades
│       └── helpers.js
├── assets/                   # Imágenes y recursos
└── package.json
```

## 🔐 Credenciales de prueba

Para probar la aplicación, puedes usar las siguientes credenciales (si ya tienes usuarios creados en la base de datos):

**Usuario administrador:**
- Email: admin@example.com
- Contraseña: admin123

**Usuario regular:**
- Email: usuario@example.com
- Contraseña: user123

## 🐛 Solución de problemas

### Error de conexión al servidor

1. **Verifica que el servidor esté corriendo** en el puerto 8000
2. **Cambia la IP en apiService.js** por la IP correcta de tu computadora
3. **Asegúrate de estar en la misma red WiFi** que tu computadora

### Error al escanear QR

1. **Asegúrate de tener Expo Go instalado**
2. **Verifica que tengas conexión a internet**
3. **Intenta con el modo tunnel**: `npx expo start --tunnel`

### Dependencias faltantes

Si hay errores de dependencias, ejecuta:
```bash
npm install
npx expo install --fix
```

## 📞 API Endpoints utilizados

- `POST /users/login` - Autenticación de usuarios
- `GET /users` - Obtener lista de usuarios (admin)
- `POST /users` - Crear nuevo usuario
- `GET /reports` - Obtener reportes

## 🎯 Próximos pasos

1. **Implementar registro de usuarios**
2. **Agregar funcionalidad de reportes**
3. **Integrar mapas con geolocalización**
4. **Implementar notificaciones push**
5. **Agregar tests unitarios**

---

**¡Listo!** 🎉 Tu aplicación móvil está configurada y lista para usar con Expo Go.
