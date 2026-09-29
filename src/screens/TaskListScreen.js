import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { EmptyState } from "../components/EmptyState";
import { fetchTasks, toggleTask, setFilter } from "../store/taskSlice";

const FILTERS = [
  { label: "Todas", value: "all" },
  { label: "Pendientes", value: "pending" },
  { label: "Completadas", value: "completed" },
];

export const TaskListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.items);
  const filter = useSelector((state) => state.tasks.filter);
  const status = useSelector((state) => state.tasks.status);

  React.useEffect(() => {
    if (user) dispatch(fetchTasks(user.uid));
  }, [dispatch, user?.uid]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const onToggleComplete = async (task) => {
    try {
      await dispatch(
        toggleTask({ id: task.id, completed: task.completed }),
      ).unwrap();
    } catch {
      Alert.alert(
        "Error",
        "No se pudo actualizar la tarea. Revisá tu conexión e intentá de nuevo.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={styles.filterContainer}>
        {FILTERS.map((item) => {
          const isSelected = filter === item.value;
          return (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
              onPress={() => dispatch(setFilter(item.value))}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected
                    ? styles.chipTextSelected
                    : styles.chipTextUnselected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {status === "loading" && tasks.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : status === "failed" && tasks.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>
            No se pudieron cargar tus tareas.
          </Text>
          <Text style={styles.errorSubtitle}>
            Revisá tu conexión e intentá de nuevo.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchTasks(user.uid))}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.taskCard,
                item.completed && styles.taskCardCompleted,
              ]}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("TaskDetail", {
                  taskId: item.id,
                  title: item.title,
                })
              }
            >
              <TouchableOpacity
                onPress={() => onToggleComplete(item)}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.checkbox}
              >
                <Ionicons
                  name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                  size={24}
                  color={item.completed ? colors.primary : colors.textSecondary}
                />
              </TouchableOpacity>

              <View style={styles.taskCardContent}>
                <View style={styles.taskCardHeader}>
                  <Text style={styles.taskTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {item.category}
                    </Text>
                  </View>
                </View>
                <Text style={styles.taskDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  errorSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipUnselected: {
    backgroundColor: colors.chipUnselected,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: colors.textPrimary,
  },
  chipTextUnselected: {
    color: colors.textSecondary,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  taskCardCompleted: {
    opacity: 0.5,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  taskCardContent: {
    flex: 1,
  },
  taskCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: colors.chipUnselected,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  taskDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
