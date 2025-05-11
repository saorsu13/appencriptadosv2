// src/styles/TabNavigatorStyles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
    height: 80,
    
  },
  tabBarItem: {
    overflow: "hidden",
    borderRadius: 16,
    marginHorizontal: 8,
    marginTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
  },
  tabBarIcon: {
    marginBottom: 5,
  },
});
