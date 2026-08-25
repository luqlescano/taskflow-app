import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { toggleTaskStatus } from "../store/taskSlice";

const formatDate = (isoString) => {
  if (!isoString) return "Sin fecha";
  return new Date(isoString).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const TaskDetailScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { taskId } = route.params;
  const task = useSelector((state) =>
    state.tasks.items.find((item) => item.id === taskId),
  );
  const onToggleComplete = (id) => dispatch(toggleTaskStatus(id));

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.metaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{task.category}</Text>
          </View>
          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Descripción</Text>
        <Text style={styles.description}>{task.description}</Text>

        <TouchableOpacity
          style={[
            styles.completeButton,
            task.completed && styles.completeButtonDone,
          ]}
          onPress={() => onToggleComplete(task.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.completeButtonText,
              task.completed && styles.completeButtonTextDone,
            ]}
          >
            {task.completed
              ? "Marcar como pendiente"
              : "Marcar como completada"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryBadge: {
    backgroundColor: colors.chipUnselected,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 12,
  },
  categoryBadgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  date: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  sectionLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  completeButtonDone: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  completeButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  completeButtonTextDone: {
    color: colors.textSecondary,
  },
});
