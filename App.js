import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { colors } from "./src/constants/colors";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar style="light" backgroundColor={colors.cardBackground} />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
