import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const TASKS = "tasks";

// Trae solo las tareas del usuario activo.
export const fetchTasks = async (userId) => {
  const q = query(collection(db, TASKS), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Crea la tarea en Firestore y devuelve el objeto ya con su id.
export const createTask = async ({ userId, title, description, category }) => {
  const data = {
    userId,
    title,
    description,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const ref = await addDoc(collection(db, TASKS), data);
  return { id: ref.id, ...data };
};

export const updateTaskStatus = (id, completed) =>
  updateDoc(doc(db, TASKS, id), { completed });

export const removeTask = (id) => deleteDoc(doc(db, TASKS, id));
