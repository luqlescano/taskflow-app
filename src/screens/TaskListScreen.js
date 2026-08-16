import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { EmptyState } from "../components/EmptyState";

export const TaskListScreen = ({ navigation, tasks, onToggleComplete }) => {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={tasks}
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
                onPress={() => onToggleComplete(item.id)}
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
