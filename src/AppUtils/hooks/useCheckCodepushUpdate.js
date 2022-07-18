import { Alert } from "react-native";
import CodePush from "react-native-code-push";

// Codepush update
export const useCheckCodepushUpdate = ({
    showPopup = undefined,
    setPopupVisible = undefined
} = {}) => {
    //=> to check if any codepush update is available for the current version
    const checkCodePushUpdate = () => {
        CodePush.checkForUpdate()
            .then((update) => {
                // if (update) {
                //     showPopup && showPopup({
                //         type: 'Success',
                //         response: {
                //             message: 'Please update the app for better user experience'
                //         },
                //         onConfirmPress: () => {
                //             CodePush.sync({
                //                 installMode: CodePush.InstallMode.IMMEDIATE,
                //                 // updateDialog: {
                //                 //   title: 'Update available'
                //                 // }
                //             })
                //             setPopupVisible && setPopupVisible(false)
                //         }
                //     })
                // }
                if (update) {
                    Alert.alert(
                        "Update Available",
                        "Click Install to install the update",
                        [
                            {
                                text: "Install", onPress: () => {
                                    CodePush.sync({
                                        installMode: CodePush.InstallMode.IMMEDIATE,
                                        // updateDialog: {
                                        //     title: 'Update available',
                                        //     mandatoryContinueButtonLabel,
                                        //     mandatoryUpdateMessage
                                        // }
                                    })
                                }
                            }
                        ],
                        {
                            cancelable: false
                        }
                    );
                }
            })
    }

    return {
        checkCodePushUpdate
    }
};