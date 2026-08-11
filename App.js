import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootScreen } from "./src/screens/RootScreen";
import { colors } from "./src/constants/colors";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.cardBackground} />
      <RootScreen />
    </SafeAreaProvider>
  );
}
