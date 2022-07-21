import { StyleSheet } from "react-native";
import { STYLES, typography } from "../../../appStyles";
import { width } from "../../../utils/config";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: "#101010",
    fontFamily: typography.montserrat_500,
  },
  mandatory: {
    color: "#D00A0A",
  },
});

export default styles;
