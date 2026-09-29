import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { ProfileCard } from "../components/ProfileCard";
import { colors } from "../constants/colors";
import { userData } from "../constants/user";
import { logOutUser } from "../store/authSlice";
import { clearTasks } from "../store/taskSlice";
import { fetchProfile, updateAvatar } from "../store/profileSlice";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const avatarUri = useSelector((state) => state.profile.avatarUri);
  const isSaving = useSelector((state) => state.profile.isSaving);

  React.useEffect(() => {
    if (user) dispatch(fetchProfile(user.uid));
  }, [dispatch, user?.uid]);

  const handleChangeAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permiso necesario",
        "Necesitamos acceso a tus fotos para elegir un avatar.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    try {
      await dispatch(
        updateAvatar({ userId: user.uid, avatarUri: result.assets[0].uri }),
      ).unwrap();
    } catch {
      Alert.alert(
        "Error",
        "No se pudo guardar la foto de perfil. Intentá de nuevo.",
      );
    }
  };

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
          image={avatarUri ? { uri: avatarUri } : userData.image}
          onChangeAvatar={handleChangeAvatar}
          isSaving={isSaving}
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
