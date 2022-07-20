import { StyleSheet } from "react-native";
import { STYLES, typography } from "../../../appStyles";
import { width } from "../../../utils/config";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 12,
  },
  text: {
    marginLeft: 5,
    color: "#1B3687",
    fontFamily: typography.montserrat_600,
    fontSize: 14,
  },
});

export default styles;
