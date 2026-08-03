import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { CategorySelector } from "../components/CategorySelector";

export const AddTaskScreen = () => {
  // Hook para obtener el espacio seguro superior exacto del dispositivo
  const insets = useSafeAreaInsets();

  // Estado local
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabajo");

  // Estados para foco visual
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);

  // Estado de intento de envío (touched)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validaciones
  const getTitleError = () => {
    if (!isSubmitted) return "";
    if (!title.trim()) return "El título es obligatorio.";
    if (title.trim().length < 5)
      return "El título debe tener al menos 5 caracteres.";
    return "";
  };

  const getDescriptionError = () => {
    if (!isSubmitted) return "";
    if (!description.trim()) return "La descripción es obligatoria.";
    if (description.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    return "";
  };

  const titleError = getTitleError();
  const descriptionError = getDescriptionError();

  // Condicional para saber si hay errores activos tras el envío
  const hasErrors = isSubmitted && (!!titleError || !!descriptionError);

  const handleAddTask = () => {
    setIsSubmitted(true);

    const isTitleValid = title.trim().length >= 5;
    const isDescValid = description.trim().length >= 10;

    if (!isTitleValid || !isDescValid) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    console.log("Tarea capturada:", newTask);

    Alert.alert("Éxito", "Tarea capturada localmente", [
      {
        text: "OK",
        onPress: () => {
          setTitle("");
          setDescription("");
          setCategory("Trabajo");
          setIsSubmitted(false);
        },
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.headerTitle}>Nueva Tarea</Text>

            {/* Campo Título */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={[
                  styles.input,
                  isTitleFocused && styles.inputFocused,
                  !!titleError && styles.inputError,
                ]}
                placeholder="Escribí el título de la tarea..."
                placeholderTextColor={colors.textSecondary}
                value={title}
                onChangeText={setTitle}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                autoCapitalize="sentences"
                returnKeyType="next"
                selectionColor={colors.primary}
              />
              {!!titleError && (
                <Text style={styles.errorText}>{titleError}</Text>
              )}
            </View>

            {/* Campo Descripción */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  isDescFocused && styles.inputFocused,
                  !!descriptionError && styles.inputError,
                ]}
                placeholder="Escribí la descripción de la tarea..."
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                onFocus={() => setIsDescFocused(true)}
                onBlur={() => setIsDescFocused(false)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoCapitalize="sentences"
                selectionColor={colors.primary}
              />
              {!!descriptionError && (
                <Text style={styles.errorText}>{descriptionError}</Text>
              )}
            </View>

            {/* Selector de Categoría */}
            <CategorySelector
              selectedCategory={category}
              onSelectCategory={setCategory}
            />

            {/* Botón Guardar */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                hasErrors && styles.submitButtonDisabled,
              ]}
              onPress={handleAddTask}
              activeOpacity={0.6}
              disabled={hasErrors}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  hasErrors && styles.submitButtonTextDisabled,
                ]}
              >
                Guardar Tarea
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 24,
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
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  inputFocused: {
    borderColor: colors.borderFocused,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
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
});
