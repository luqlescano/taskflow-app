import { StatusBar } from "expo-status-bar";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { colors } from "./src/constants/colors";

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.cardBackground} />
      <ProfileScreen />
    </>
  );
}
