// src/components/organisms/HomeTab/BlogEncriptados/CarouselBlogItemStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 10,
    marginHorizontal: 6,
    elevation: 5,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageContainer: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontWeight: "300",
    fontSize: 14,
  },
  readMore: {
    fontWeight: "300",
    fontSize: 14,
    marginTop: 8,
    textDecorationLine: "underline",
  },
});
