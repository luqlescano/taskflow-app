import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const USERS = "users";

export const fetchProfile = async (userId) => {
  const snapshot = await getDoc(doc(db, USERS, userId));
  return snapshot.exists() ? snapshot.data() : {};
};

export const saveAvatarUri = (userId, avatarUri) =>
  setDoc(doc(db, USERS, userId), { avatarUri }, { merge: true });
