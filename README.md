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

## Checkpoint 3: Formulario de Creación y Validaciones

En esta tercera entrega se implementó la pantalla de creación de tareas (`AddTaskScreen`), incorporando gestión de estado local, validaciones en tiempo real, selector de categorías y feedback visual interactivo.

### 📱 Nuevas Funcionalidades y Componentes

- **AddTaskScreen**: Pantalla principal para registrar nuevas tareas con formulario controlado (`title`, `description`, `category`).
- **CategorySelector**: Componente reutilizable en `src/components` para la selección interactiva de categorías, inicializado en `"Trabajo"`.
- **Validaciones y UX**:
  - Validación del título (mínimo 5 caracteres) y descripción (mínimo 10 caracteres).
  - Feedback de foco visual (`inputFocused`) y bordes de error (`inputError`) con mensajes dinámicos.
  - Estado deshabilitado visual y funcional en el botón de guardado ante presencia de errores.
  - Gestión de teclado con `KeyboardAvoidingView` y descarte al tocar fuera con `TouchableWithoutFeedback`.
- **Simulación de API**: Procesamiento en `handleAddTask` para crear el objeto `newTask`, log en consola, alerta de confirmación nativa y reseteo de campos.
- **Safe Area Context**: Integración global de `SafeAreaProvider` y `useSafeAreaInsets` para garantizar la adaptabilidad visual en dispositivos con notch / Dynamic Island.

## Instalación y Ejecución Local

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
