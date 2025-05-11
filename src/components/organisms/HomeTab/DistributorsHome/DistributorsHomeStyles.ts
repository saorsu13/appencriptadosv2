// src/components/organisms/HomeTab/DistributorsHome/DistributorsHomeStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    rowGap: 10,
  },
  titleContainer: {
    width: 150,
    padding: 10,
    borderRadius: 50,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  subtitleText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  descriptionText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14,
    width: 320,
  },
  button: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 15,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 200,
  },
  buttonText: {
    fontWeight: "600",
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    width: 400,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
});
