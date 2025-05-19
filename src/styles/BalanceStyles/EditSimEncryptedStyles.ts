import { StyleSheet } from "react-native";
import theme from "@/config/theme";

export default StyleSheet.create({
  container: {
    display: "flex",
    gap: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  required: {
    color: theme.colors.mainActionState,
  },
  containerForm: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  containerFormFields: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  loadingButton: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  defaultLabel: {
    color: theme.colors.labelText,
    paddingLeft: 3,
    ...theme.textVariants.descriptionCard,
  },
  containerTitleForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleForm: {
    color: theme.colors.textContrast,
    ...theme.textVariants.modalSummary,
  },
  titleLink: {
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colors.textLInk,
    color: theme.colors.textLInk,
  },
  containerHeader: {
    display: "flex",
    gap: 20,
  },
  containerHeaderImage: {
    aspectRatio: 2.1126,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: 158,
    width: "100%",
  },
  containerHeaderTitle: {
    color: theme.colors.contrast,
    fontFamily: theme.textVariants.input.fontFamily,
    textAlign: "center",
    justifyContent: "center",
    ...theme.textVariants.buttonGroup,
  },
  background: {
    borderRadius: 18,
    height: 158,
    width: "100%",
  },
  bottomButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageBackground: {
    width: "100%",
    height: 158,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  textInfo: {
    marginTop: 8,
    alignSelf: "center",
    color: "#5c5c5c",
  },
});
