import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Wrappers finos sobre el SDK. La lógica de estado vive en authSlice.
export const createAccount = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

// Traduce los códigos de error de Firebase a mensajes para la UI.
const ERROR_MESSAGES = {
  "auth/invalid-email": "El email no tiene un formato válido.",
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/user-not-found": "No existe una cuenta con ese email.",
  "auth/wrong-password": "Email o contraseña incorrectos.",
  "auth/email-already-in-use": "Ya existe una cuenta con ese email.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/too-many-requests":
    "Demasiados intentos fallidos. Probá de nuevo en unos minutos.",
  "auth/network-request-failed":
    "Sin conexión. Revisá tu internet e intentá otra vez.",
};

export const mapAuthError = (code) =>
  ERROR_MESSAGES[code] ?? "Ocurrió un error. Intentá nuevamente.";
