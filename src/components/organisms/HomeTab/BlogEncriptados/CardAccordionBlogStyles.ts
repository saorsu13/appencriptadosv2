import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: (windowWidth - 220) / 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    width: "34%",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  arrowContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  arrowButton: {
    marginHorizontal: 10,
  },
});
