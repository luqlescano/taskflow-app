import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

const ICONS_BY_ROUTE = {
  Home: { active: "list", inactive: "list-outline" },
  Profile: { active: "person", inactive: "person-outline" },
};

export const TabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom || 12 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isActive = state.index === index;
        const icons = ICONS_BY_ROUTE[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityLabel={label}
          >
            <Ionicons
              name={isActive ? icons.active : icons.inactive}
              size={22}
              color={isActive ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: colors.inputBackground,
  },
});
