import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";
import { resetAuthValues } from "../redux/reducer/authReducer";
import { store } from "../redux/store";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function resetToInitialScreen(props) {
  // console.log('called navigate',props)
  Alert.alert('Logged out!')
  store.dispatch(resetAuthValues({}))
  // _navigator.dispatch(
  //   CommonActions.reset({
  //     index: 0,
  //     routes: [{ name: "" }],
  //   })
  // );
}

// function navigateToPremium(props) {
//   // console.log('called navigateToPremium',props)
//   _navigator.dispatch(
//     CommonActions.navigate({
//       name: screenNameConstants.PROFILE.Premium,
//       params: {
//         isValidPlan: true,
//         navigateToMore: true
//       },
//     })
//   );
// }
// function mapStateToProps(state) {
//   let { cartReducer, authReducer } = state
//   return {
//     // count: state
//     // ...state,
//     roles: authReducer.roles,
//     name: authReducer.name
//   }
// }
// const navigate = connect(mapStateToProps, { resetRedux })(navigates);
// add other navigation functions that you need and export them

export default {
  resetToInitialScreen,
  // navigateToPremium,
  setTopLevelNavigator,
}