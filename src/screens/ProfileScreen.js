import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileCard } from "../components/ProfileCard";
import { colors } from "../constants/colors";
import avatarImg from "../assets/user-placeholder.png";

export const ProfileScreen = () => {
  const userData = {
    name: "Lucas Lescano",
    role: "Full Stack Developer",
    image: avatarImg,
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.content}>
        <ProfileCard
          name={userData.name}
          role={userData.role}
          image={userData.image}
        />
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
});
