import { colors } from "../constants/colors";

// screenOptions compartidos por el stack privado y el público.
export const screenOptions = {
  headerStyle: { backgroundColor: colors.cardBackground },
  headerShadowVisible: false,
  headerTintColor: colors.primary,
  headerTitleStyle: { color: colors.textPrimary, fontWeight: "bold" },
  headerBackButtonDisplayMode: "minimal",
};
