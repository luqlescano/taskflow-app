import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { loginUser, clearError } from "../store/authSlice";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const isFormValid = isValidEmail(email) && password.length >= 6;

  const handleLogin = () => {
    Keyboard.dismiss();
    if (!isFormValid) return;
    dispatch(loginUser({ email: email.trim(), password }));
  };

  const goToRegister = () => {
    dispatch(clearError());
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.heading}>Bienvenido de nuevo</Text>
            <Text style={styles.subheading}>Ingresá para ver tus tareas.</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, isEmailFocused && styles.inputFocused]}
                placeholder="tu@email.com"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                selectionColor={colors.primary}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={[styles.input, isPasswordFocused && styles.inputFocused]}
                placeholder="Tu contraseña"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                secureTextEntry
                autoComplete="password"
                selectionColor={colors.primary}
              />
            </View>

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isFormValid || isLoading) && styles.submitButtonDisabled,
              ]}
              onPress={handleLogin}
              activeOpacity={0.6}
              disabled={!isFormValid || isLoading}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  (!isFormValid || isLoading) &&
                    styles.submitButtonTextDisabled,
                ]}
              >
                {isLoading ? "Ingresando..." : "Iniciar sesión"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToRegister} activeOpacity={0.7}>
              <Text style={styles.linkText}>
                ¿No tenés cuenta?{" "}
                <Text style={styles.linkTextAccent}>Registrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: colors.borderFocused,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonTextDisabled: {
    color: colors.textSecondary,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
  },
  linkTextAccent: {
    color: colors.primary,
    fontWeight: "600",
  },
});
