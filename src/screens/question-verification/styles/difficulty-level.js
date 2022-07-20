import { StyleSheet } from "react-native";
import { STYLES, typography } from "../../../appStyles";
import { width } from "../../../utils/config";

const styles = StyleSheet.create({
  difficultyLevelContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    marginRight: 5,
  },
  selected: {
    height: 25,
    width: 25,
    borderColor: "#1B3687",
  },
  text: {
    fontSize: 14,
    color: "#BFBFBF",
    fontFamily: typography.montserrat_400,
  },
  selectedText: {
    color: "#1B3687",
    fontSize: 17,
    marginTop: -1,
  },
});

export default styles;
