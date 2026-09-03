import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ProfileCard } from "../components/ProfileCard";
import { colors } from "../constants/colors";
import { userData } from "../constants/user";
import { logOutUser } from "../store/authSlice";
import { clearTasks } from "../store/taskSlice";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Maneja el cierre de sesión con confirmación.
  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Querés salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => {
          dispatch(clearTasks());
          dispatch(logOutUser());
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={styles.content}>
        <ProfileCard
          name={user?.email ?? "Sin sesión"}
          role={userData.role}
          image={userData.image}
        />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  logoutButton: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  logoutButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
});
