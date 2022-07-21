import { StyleSheet } from "react-native";
import { STYLES, typography } from "../../../appStyles";
import { width } from "../../../utils/config";

const styles = StyleSheet.create({
  toBeVerfified: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 47,
    backgroundColor: "#FFDEBF",
    padding: 6,
    maxWidth: "25%",
  },
  similarOption: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 47,
    backgroundColor: "#E8E8E8",
    padding: 6,
    maxWidth: "26%",
  },
  text: {
    fontSize: 10,
    fontFamily: typography.montserrat_400,
  },
});

export default styles;
