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
import { registerUser, clearError } from "../store/authSlice";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const passwordsMatch = password === confirmPassword;
  const showMismatch = confirmPassword.length > 0 && !passwordsMatch;
  const isFormValid =
    isValidEmail(email) && password.length >= 6 && passwordsMatch;

  const handleRegister = () => {
    Keyboard.dismiss();
    if (!isFormValid) return;
    dispatch(registerUser({ email: email.trim(), password }));
  };

  const goToLogin = () => {
    dispatch(clearError());
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.heading}>Crear cuenta</Text>
            <Text style={styles.subheading}>
              Empezá a organizar tus tareas.
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "email" && styles.inputFocused,
                ]}
                placeholder="tu@email.com"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                selectionColor={colors.primary}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "password" && styles.inputFocused,
                ]}
                placeholder="Al menos 6 caracteres"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
                autoComplete="new-password"
                selectionColor={colors.primary}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Repetir contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "confirm" && styles.inputFocused,
                  showMismatch && styles.inputError,
                ]}
                placeholder="Repetí la contraseña"
                placeholderTextColor={colors.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedField("confirm")}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
                autoComplete="new-password"
                selectionColor={colors.primary}
              />
              {showMismatch && (
                <Text style={styles.errorText}>
                  Las contraseñas no coinciden.
                </Text>
              )}
            </View>

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isFormValid || isLoading) && styles.submitButtonDisabled,
              ]}
              onPress={handleRegister}
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
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToLogin} activeOpacity={0.7}>
              <Text style={styles.linkText}>
                ¿Ya tenés cuenta?{" "}
                <Text style={styles.linkTextAccent}>Iniciá sesión</Text>
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
  inputError: {
    borderColor: colors.error,
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
