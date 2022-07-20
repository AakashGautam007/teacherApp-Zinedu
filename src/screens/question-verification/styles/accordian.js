import { StyleSheet } from "react-native";
import { STYLES, typography } from "../../../appStyles";
import { width } from "../../../utils/config";

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  header: {
    height: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 13,
    color: "#201F1F",
    fontSize: 16,
    fontFamily: typography.montserrat_600,
  },
  badge: {
    marginRight: 15,
    height: 30,
    width: 30,
    backgroundColor: "#1F3061",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  badgeText: {
    fontSize: 16,
  },
  subHeader: {
    height: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor: 'gray'
  },
  subHeaderText: {
    marginLeft: 30,
    color: "#535353",
    fontSize: 16,
    fontFamily: typography.montserrat_600,
    maxWidth: "65%",
  },
  subHeaderBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  subHeaderBadgeText: {
    color: "black",
    fontSize: 16,
  },
});

export default styles;
