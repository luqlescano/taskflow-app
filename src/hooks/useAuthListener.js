import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { setUser } from "../store/authSlice";

// Escucha los cambios de sesión de Firebase y los refleja en Redux.
// Al montar dispara una vez con la sesión persistida (o null).
export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ? { uid: user.uid, email: user.email } : null));
    });
    return unsubscribe;
  }, [dispatch]);
};
