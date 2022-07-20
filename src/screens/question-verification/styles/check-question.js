import { StyleSheet } from "react-native";
import { STYLES, typography } from "../../../appStyles";
import { width } from "../../../utils/config";

const styles = StyleSheet.create({
  parentContainer: {
    // flex: 1,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 20,
  },
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    paddingBottom: 20,
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    fontFamily: typography.montserrat_400,
  },
  tag: {
    marginVertical: 10,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 20,
  },
  questionText: {
    color: "#5B5B5B",
    fontSize: 16,
    marginTop: 10,
  },
  answerText: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 20,
  },
  questionIdTextContainer: {
    borderRadius: 10,
    backgroundColor: "#E7E7E7",
    paddingHorizontal: 10,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  questionIdText: {
    color: "#595959",
    fontFamily: typography.montserrat_400,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionBorderContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    paddingVertical: 5,
    marginTop: 20,
    borderColor: "#BDBDBD",
  },
  approveRejectContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  approveButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2B3789",
    paddingHorizontal: 20,
    padding: 6,
  },
  approveText: {
    color: "#2B3789",
    fontSize: 14,
    fontFamily: typography.montserrat_400,
  },
  modalParentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 30,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: typography.montserrat_400,
  },
});

export default styles;
