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

## Checkpoint 5: Navegación con React Navigation

En esta quinta entrega se reemplazó la navegación simulada por estado (`activeScreen` en `RootScreen`) por una estructura profesional con `React Navigation`, consolidando la app en un árbol de navegadores anidados (Tab + Stack).

### Estructura de navegación

```
Tab.Navigator (src/navigation/AppNavigator.js)
├── Home  → Stack.Navigator (headerShown: false a nivel tab)
│   ├── TaskList   (ruta inicial)
│   ├── TaskDetail (recibe taskId y title por route.params)
│   └── TaskForm   (accesible desde el botón "+" del header de TaskList)
└── Profile
```

### 📱 Nuevas Funcionalidades y Componentes

- **AppNavigator**: nuevo archivo `src/navigation/AppNavigator.js` que centraliza toda la configuración de navegación y reemplaza a `RootScreen` (eliminado) como punto de orquestación. Mantiene el estado `tasks` (`useState`) y los handlers `handleAddTask` / `handleDeleteTask` / `handleToggleTaskComplete`, inyectándolos a las pantallas mediante el patrón de *render props* de `Stack.Screen`.
- **Bottom Tab Navigator**: `createBottomTabNavigator` con las pestañas `Home` y `Profile`, usando `TabBar` (adaptado desde el checkpoint anterior) como `tabBar` personalizado. Las etiquetas de texto se reemplazaron por íconos vectoriales de `@expo/vector-icons` (`list` / `person`), que cambian de color según la pestaña activa — conectado a `state` / `descriptors` / `navigation` de React Navigation en lugar de un `useState` local.
- **Native Stack anidado**: la pestaña `Home` es en realidad un `createNativeStackNavigator` (`TaskList` → `TaskDetail`), cumpliendo con la arquitectura anidada Tab + Stack pedida en la consigna.
- **TaskListScreen** (antes `HomeScreen`): navega a `TaskDetail` pasando `taskId` y `title` por `route.params` con `navigation.navigate()`. Ya no renderiza el detalle "a mano" ni incluye el `ProfileCard` (se dejó únicamente en la pestaña Perfil, para no duplicarlo). Cada card de tarea suma un ícono circular a la izquierda (`ellipse-outline` / `checkmark-circle`) que permite marcarla como completada sin entrar al detalle; las tareas completadas se muestran con opacidad reducida.
- **TaskDetailScreen**: recibe `route.params.taskId` en lugar del objeto `task` completo por props, y busca la tarea en el array `tasks` inyectado desde `AppNavigator`. El botón de eliminar se movió al header nativo (`headerRight`, ícono `trash-outline`), manteniendo la confirmación vía `Alert.alert`. Se agregó un botón "Marcar como completada" / "Marcar como pendiente" debajo de la descripción, que alterna el estado `completed` de la tarea (sincronizado con el ícono de la lista).
- **TaskFormScreen** (antes `AddTaskScreen`): tras presionar "Guardar Tarea", dispara el `onAddTask` recibido por props (la tarea nace con `completed: false`) y ejecuta `navigation.popToTop()` para volver a `TaskList`. Se usó `popToTop()` en lugar de `navigate('TaskList')` porque este último empujaba una instancia nueva de la pantalla encima de la existente (dejando un botón "atrás" colgado hacia el formulario) en vez de volver a la que ya estaba en el stack.
- **Headers nativos**: se activaron los headers del Stack (antes ocultos, con títulos manejados a mano dentro de cada pantalla), estilizados con la misma paleta de `src/constants/colors.js` (`cardBackground`, `textPrimary`, `primary`) para mantener coherencia visual y mostrar títulos acordes a la pantalla activa. En iOS, `headerBackButtonDisplayMode: "minimal"` deja el botón de volver solo con el ícono (sin el texto de la pantalla anterior), igual que en Android.
- **Dependencias nuevas**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-screens` y `@expo/vector-icons`.

## Checkpoint 6: Estado Global con Redux Toolkit

En esta sexta entrega se migró la gestión de tareas del `useState` local de `AppNavigator` a un store global con **Redux Toolkit**, eliminando el prop-drilling entre pantallas y sumando un filtro de tareas que persiste al navegar.

### Estructura del store

```
src/store/
├── store.js       → configureStore({ reducer: { tasks } })
└── taskSlice.js    → createSlice("tasks"): items (con datos de ejemplo) + filter
```

### 📱 Nuevas Funcionalidades y Componentes

- **`store.js`**: configura el store central de la app con `configureStore`.
- **`taskSlice.js`**: define el slice `tasks` con estado inicial `{ items: [...tareas de ejemplo], filter: "all" }` y los reducers `addTask` (genera `id`/`createdAt` automáticamente vía `prepare`), `toggleTaskStatus`, `deleteTask` y `setFilter`.
- **`App.js`**: envuelto con `<Provider store={store}>` para que toda la navegación tenga acceso al estado global.
- **`AppNavigator.js`**: ya no mantiene `tasks` en `useState` ni lo pasa por props; el botón de eliminar del header despacha `deleteTask` directamente con `useDispatch`.
- **`TaskListScreen`**: lee las tareas con `useSelector` (ya filtradas según `state.tasks.filter`) y suma un selector de filtro (chips "Todas" / "Pendientes" / "Completadas", con el mismo estilo visual que `CategorySelector`) que despacha `setFilter`. Al vivir en el store, el filtro se mantiene aunque se navegue a otra pestaña.
- **`TaskFormScreen`**: reemplaza el `onAddTask` por props por un `dispatch(addTask({...}))`.
- **`TaskDetailScreen`**: obtiene la tarea con `useSelector` buscándola por `taskId` en lugar de recibirla por props, y usa `useDispatch` para `toggleTaskStatus`.
- **Dependencias nuevas**: `@reduxjs/toolkit` y `react-redux`.

## Checkpoint 7: Autenticación y Persistencia con Firebase

En esta séptima entrega TaskFlow deja de ser una app local: se integró **Firebase Authentication** (email/contraseña) con rutas protegidas y persistencia de sesión, y las tareas pasaron a guardarse en **Cloud Firestore**, separadas por usuario y sincronizadas con el store de Redux.

### Estructura nueva

```
src/services/
├── firebaseConfig.js  → initializeApp + auth (persistencia AsyncStorage) + db (Firestore)
├── authService.js     → createAccount / signIn / logOut + traducción de errores
└── taskService.js     → CRUD sobre la colección "tasks" (filtrado por userId)

src/store/authSlice.js  → sesión { user, isLoading, error } + thunks register/login/logout
src/hooks/useAuthListener.js → onAuthStateChanged → dispatch(setUser)
src/navigation/AuthNavigator.js → stack público (Login ↔ Register)
src/navigation/screenOptions.js → headers compartidos entre stack público y privado
src/screens/LoginScreen.js · RegisterScreen.js · LoadingScreen.js
```

### 📱 Nuevas funcionalidades

- **Flujo de autenticación**: `LoginScreen` y `RegisterScreen` con validación en tiempo real (email válido, contraseña ≥ 6, confirmación de contraseña en el registro) y el mismo estilo de inputs que `TaskFormScreen`. Los errores de Firebase se traducen a mensajes en español (`mapAuthError`).
- **Rutas protegidas**: `AppNavigator` renderiza `AuthNavigator` (público) o los Tabs (privado) según `state.auth.user`. Sin sesión, no hay forma de llegar a la lista de tareas.
- **Persistencia de sesión**: `useAuthListener` registra `onAuthStateChanged` y despacha el usuario a Redux. Al reabrir la app, mientras se resuelve la sesión persistida se muestra `LoadingScreen`; si había sesión, entra directo a "Mis Tareas".
- **CRUD en Firestore con separación por usuario**: cada tarea se guarda en la colección `tasks` con el campo `userId` (uid del usuario). `TaskListScreen` hace `fetchTasks(user.uid)` al montar y solo trae las tareas propias. Alta, cambio de estado y borrado impactan en Firestore y en Redux.
- **Sincronización con Redux**: los datos de Firestore alimentan `state.tasks.items`; el filtro (Todas / Pendientes / Completadas) y el estado vacío siguen funcionando sobre la fuente persistida.
- **Perfil**: `ProfileCard` muestra el email del usuario autenticado y se agregó el botón "Cerrar sesión" (con confirmación), que limpia el store de tareas y cierra la sesión en Firebase.
- **Robustez**: los errores de autenticación se muestran en la UI; los errores de Firestore al crear o eliminar tareas se avisan con `Alert`, y los de lectura/cambio de estado quedan registrados en el estado sin cerrar la app.

### 🔧 Configuración de Firebase

El repo ya incluye un archivo `.env` apuntando a un **proyecto de Firebase de demo**, así que la app corre sin configuración previa (`git clone` → `npm install` → `npx expo start`). Este `.env` se versiona a propósito para facilitar la corrección; la config web de Firebase no es un secreto y la seguridad la dan las reglas de Firestore + Authentication.

Para usar tu propio proyecto, reemplazá los valores del `.env` siguiendo estos pasos:

1. Crear un proyecto en la [consola de Firebase](https://console.firebase.google.com/).
2. **Authentication** → *Sign-in method* → habilitar **Email/Password**.
3. **Firestore Database** → *Crear base de datos* (modo producción).
4. En **Firestore → Rules**, pegar:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /tasks/{taskId} {
         allow read, update, delete: if request.auth != null
           && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null
           && request.auth.uid == request.resource.data.userId;
       }
     }
   }
   ```

5. **Project settings → General → Your apps →** registrar una *Web app* y copiar la config.
6. Pegar esos valores en el `.env` de la raíz (ver `.env.example` para los nombres de las variables):

   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   EXPO_PUBLIC_FIREBASE_APP_ID=...
   ```

### ✅ Cómo se probaron los flujos

**1. Verificación automatizada del backend.** Se corrió un script (Node, con el SDK de Firebase) contra el proyecto real, ejercitando Auth + Firestore + reglas de seguridad y limpiando los usuarios de prueba al terminar. Resultado: **10/10 checks OK**.

| Flujo | Resultado |
|---|---|
| Registro de usuario nuevo (`createUserWithEmailAndPassword`) | ✅ crea la cuenta en Authentication |
| Login con credenciales correctas (`signInWithEmailAndPassword`) | ✅ |
| Login con contraseña incorrecta | ✅ rechazado con `auth/invalid-credential` → "Email o contraseña incorrectos." |
| Alta de tarea en `tasks` con `userId` y `completed: false` | ✅ el documento queda en Firestore |
| Lectura filtrada `where("userId", "==", uid)` | ✅ solo devuelve las tareas propias |
| Marcar como completada (`updateDoc { completed }`) | ✅ el campo cambia en el documento |
| Eliminar tarea (`deleteDoc`) | ✅ el documento desaparece |
| **Usuario B intenta leer las tareas de A** | ✅ **`permission-denied`** — las reglas de Firestore lo bloquean |
| Usuario B ve su propia lista | ✅ vacía (0 documentos) |
| Registro de un segundo usuario independiente | ✅ |

**2. Build.** `npx expo export -p ios` genera el bundle sin errores de resolución con el `.env` cargado.

**3. Pendiente de prueba en dispositivo (Expo Go).** El recorrido visual de las pantallas y, en particular, la **persistencia de sesión al cerrar y reabrir la app** (`onAuthStateChanged` + AsyncStorage) se validan en Expo Go:

- [ ] Registro → entra directo a "Mis Tareas" (flujo privado)
- [ ] Cerrar la app por completo con sesión activa → al reabrir entra directo a "Mis Tareas" sin pedir login
- [ ] Crear / completar / eliminar tareas desde la UI y verlas reflejadas en la consola de Firebase
- [ ] Cerrar sesión desde Perfil → vuelve a Login; al reingresar la lista se recarga desde Firestore

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

   El repo ya trae un `.env` con un proyecto de Firebase de demo, así que arranca sin pasos extra. Para usar tu propio proyecto, ver *Configuración de Firebase* en Checkpoint 7.

4. **Ejecutá en tu dispositivo:**
   Escaneá el código QR desde la app Expo Go en tu celular (iOS/Android).
