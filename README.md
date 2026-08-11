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

## Checkpoint 4: Detalle de Tarea y Estados Vacíos

En esta cuarta entrega se añadió la capa de detalle y manejo de estados de `HomeScreen`, permitiendo visualizar cada tarea creada, gestionar el estado vacío de la lista y eliminar tareas, además de reorganizar la estructura de navegación simulada del proyecto para mantener `App.js` como punto de entrada mínimo.

### 📱 Nuevas Funcionalidades y Componentes

- **HomeScreen**: recibe el arreglo `tasks` por props y gestiona el estado `selectedTask` (`useState(null)`). Renderiza condicionalmente el `EmptyState`, la `FlatList` de tareas o el `TaskDetailScreen`, según corresponda.
- **EmptyState**: componente en `src/components` que se muestra cuando no hay tareas cargadas, invitando al usuario a crear la primera.
- **TaskDetailScreen**: pantalla en `src/screens` que recibe la tarea seleccionada y muestra título, descripción, categoría y fecha de creación formateada, con botón "Volver" y botón "🗑️ Eliminar" (con confirmación vía `Alert.alert`) para borrar la tarea.
- **ProfileCard en HomeScreen**: se reutiliza el componente `ProfileCard` (creado en Checkpoint 2) en la vista de lista de tareas, junto con `src/constants/user.js`, que centraliza los datos del usuario compartidos entre `ProfileScreen` y `HomeScreen`.
- **RootScreen y TabBar**: se extrajo a `src/screens/RootScreen.js` el estado compartido (`tasks`, `activeScreen`) y los handlers (`handleAddTask`, `handleDeleteTask`), junto con `src/components/TabBar.js` como selector simple entre "Mis Tareas" y "Nueva Tarea" (a reemplazar por `React Navigation` en el próximo módulo). `App.js` vuelve a quedar mínimo, solo con `SafeAreaProvider`, `StatusBar` y `RootScreen`.
- **AddTaskScreen**: el botón "Guardar Tarea" ahora se habilita en tiempo real según la validez del formulario (`isFormValid`), en lugar de esperar a un intento de envío fallido.

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
