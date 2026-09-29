import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

export const ProfileCard = ({
  name,
  role,
  image,
  onChangeAvatar,
  isSaving,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.avatarWrapper}
        onPress={onChangeAvatar}
        disabled={!onChangeAvatar || isSaving}
        activeOpacity={0.7}
      >
        <Image source={image} style={styles.avatar} resizeMode="cover" />

        {isSaving && (
          <View style={styles.avatarOverlay}>
            <ActivityIndicator size="small" color={colors.textPrimary} />
          </View>
        )}

        {onChangeAvatar && !isSaving && (
          <View style={styles.avatarBadge}>
            <Ionicons name="camera" size={14} color={colors.textPrimary} />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        {role ? <Text style={styles.role}>{role}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    width: "100%",
  },
  avatarWrapper: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
