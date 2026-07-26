# TaskFlow App

TaskFlow es una aplicación móvil diseñada para la gestión eficiente de tareas y productividad, construida utilizando React Native y Expo.

## Checkpoint 1: Estructura Base

En esta primera entrega se configuró la arquitectura inicial del proyecto, organizando la estructura de carpetas según las buenas prácticas de desarrollo y asegurando un punto de entrada limpio y estilizado.

## Checkpoint 2: Pantallas iniciales y ProfileCard

En esta segunda entrega se refactorizó y estructuró el proyecto en módulos, implementando las pantallas iniciales, constantes de diseño globales y un componente `ProfileCard` dinámico.

### Estructura

- `src/components`: Componentes de interfaz de usuario (UI) reutilizables.
- `src/screens`: Pantallas principales de la aplicación.
- `src/assets`: Recursos locales como imágenes y fuentes.
- `src/constants`: Constantes de diseño (colores, tipografías y estilos globales).

### 📱 Pantallas visualizadas

1. **ProfileScreen**: Renderiza el componente `ProfileCard` utilizando props dinámicas (`name`, `role`, `image`) e integración de estilos centralizados con `StyleSheet`.
2. **HomeScreen**: Preparada como estructura base para los siguientes módulos del proyecto.

### Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno de desarrollo:

1. **Cloná el repositorio:**

```bash
git clone https://github.com/luqlescano/taskflow-app.git
```

2. **Instalá las dependencias:**

```bash
npm install
```

3. **Iniciá el servidor de desarrollo de Expo:**

```bash
npx expo start
```

4. **Ejecutá en tu dispositivo:**
   Escaneá el código QR desde la app Expo Go en tu celular (iOS/Android).
