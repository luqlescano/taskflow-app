import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { userData } from "../constants/user";
import { EmptyState } from "../components/EmptyState";
import { ProfileCard } from "../components/ProfileCard";
import { TaskDetailScreen } from "./TaskDetailScreen";

export const HomeScreen = ({ tasks, onDeleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDelete = () => {
    onDeleteTask(selectedTask.id);
    setSelectedTask(null);
  };

  if (selectedTask) {
    return (
      <TaskDetailScreen
        task={selectedTask}
        onBack={() => setSelectedTask(null)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.profileCardWrapper}>
        <ProfileCard
          name={userData.name}
          role={userData.role}
          image={userData.image}
        />
      </View>

      <Text style={styles.headerTitle}>Mis Tareas</Text>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.taskCard}
              activeOpacity={0.7}
              onPress={() => setSelectedTask(item)}
            >
              <View style={styles.taskCardHeader}>
                <Text style={styles.taskTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{item.category}</Text>
                </View>
              </View>
              <Text style={styles.taskDescription} numberOfLines={2}>
                {item.description}
              </Text>
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
  profileCardWrapper: {
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
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
