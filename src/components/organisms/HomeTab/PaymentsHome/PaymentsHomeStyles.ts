// src/components/organisms/HomeTab/PaymentsHome/PaymentsHomeStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 30,
  },
  iconsContainer: {
    width: "100%",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  centeredIcon: {
    flex: 1,
    alignItems: "center",
  },
});
