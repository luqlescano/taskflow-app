import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HomeScreen } from "./HomeScreen";
import { AddTaskScreen } from "./AddTaskScreen";
import { TabBar } from "../components/TabBar";
import { colors } from "../constants/colors";

export const RootScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [activeScreen, setActiveScreen] = useState("home");

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setActiveScreen("home");
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {activeScreen === "home" ? (
          <HomeScreen tasks={tasks} onDeleteTask={handleDeleteTask} />
        ) : (
          <AddTaskScreen onAddTask={handleAddTask} />
        )}
      </View>

      <TabBar activeScreen={activeScreen} onChangeScreen={setActiveScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
  },
});
