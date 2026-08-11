import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🗒️</Text>
      <Text style={styles.message}>
        ¡No tenes tareas pendientes!{"\n"}Empeza creando una.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
