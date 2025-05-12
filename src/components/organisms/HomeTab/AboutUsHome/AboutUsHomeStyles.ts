// src/components/organisms/HomeTab/AboutUsHome/AboutUsHomeStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    rowGap: 20,
  },
  titleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    padding: 10,
    borderRadius: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  imageContainer: {
    borderRadius: 15,
    overflow: "hidden",
    width: 350,
    height: 250,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 14,
    fontWeight: "300",
    textAlign: "justify",
  },
});
