import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskListScreen } from "../screens/TaskListScreen";
import { TaskDetailScreen } from "../screens/TaskDetailScreen";
import { TaskFormScreen } from "../screens/TaskFormScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TabBar } from "../components/TabBar";
import { colors } from "../constants/colors";
import { deleteTask } from "../store/taskSlice";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.cardBackground },
  headerShadowVisible: false,
  headerTintColor: colors.primary,
  headerTitleStyle: { color: colors.textPrimary, fontWeight: "bold" },
  headerBackButtonDisplayMode: "minimal",
};

const HomeStack = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName="TaskList" screenOptions={screenOptions}>
      <Stack.Screen
        name="TaskList"
        options={({ navigation }) => ({
          title: "Mis Tareas",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TaskForm")}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 24,
                  fontWeight: "600",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => <TaskListScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="TaskDetail"
        options={({ route, navigation }) => ({
          title: route.params?.title ?? "Detalle",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Eliminar tarea",
                  `¿Seguro que querés eliminar "${route.params?.title}"?`,
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Eliminar",
                      style: "destructive",
                      onPress: () => {
                        dispatch(deleteTask(route.params.taskId));
                        navigation.goBack();
                      },
                    },
                  ],
                );
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={22} color={colors.error} />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => <TaskDetailScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="TaskForm" options={{ title: "Nueva Tarea" }}>
        {(props) => <TaskFormScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false, title: "Mis Tareas" }}
        >
          {() => <HomeStack />}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
