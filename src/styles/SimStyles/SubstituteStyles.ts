import { StyleSheet } from "react-native";
import theme from "@/config/theme";

const SubstituteStyles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  containerBody: {
    display: "flex",
    flex: 1,
    gap: 25,
    marginTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  cardIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  containerOptions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
  },
  radioLabelContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  radioLabel: {
    color: "#919191",
    width: "100%",
    ...theme.textVariants.textInfo,
  },
  descriptionLabel: {
    color: theme.colors.contentSummary,
    fontSize: 14,
  },
  containerContentInformative: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  informativeText: {
    color: "#C5C5C5",
    textAlign: "center",
    ...theme.textVariants.titleInformative,
  },
  containerTitleSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleSection: {
    color: theme.colors.textContrast,
    ...theme.textVariants.button,
    fontSize: 12,
    lineHeight: 14,
  },
  titleLink: {
    color: theme.colors.textLInk,
    ...theme.textVariants.descriptionCard,
  },
});

export default SubstituteStyles;