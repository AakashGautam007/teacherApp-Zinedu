
import { StyleSheet, Dimensions } from 'react-native'
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const { height, width } = Dimensions.get("window");

export const AppColors = {
    BACKGROUND_COLOR: '#E5E5E5',
}

export const fontSizeConstants = {
    // RFValue10: RFValue(10),
    // // RFValue11: RFValue(10, HEIGHT),
    // RFValue11: RFValue(11),
    // RFValue12: RFValue(12, HEIGHT),
    // // RFValue12: RFPercentage(1),
    // RFValue13: RFValue(13),
    // RFValue14: RFValue(14),
    // RFValue15: RFValue(15),
    // RFValue16: RFValue(16),
    // RFValue17: RFValue(17),
    // RFValue18: RFValue(18),
    // RFValue19: RFValue(19),
    // RFValue20: RFValue(20),
    RFValue8: 8,
    RFValue9: 9,
    RFValue10: 10,
    // RFValue11: RFValue(10, HEIGHT),
    RFValue11: 11,
    RFValue12: 12,
    // RFValue12: RFPercentage(1),
    RFValue13: 13,
    RFValue14: 14,
    RFValue15: 15,
    RFValue16: 16,
    RFValue17: 17,
    RFValue18: 18,
    RFValue19: 19,
    RFValue20: 20,
    RFValue21: 21,
    RFValue22: 22,
    RFValue23: 23,
    RFValue24: 24,
    RFValue25: 25,
    RFValue26: 26,
    RFValue27: 27,
    RFValue28: 28,
    RFValue29: 29,
    RFValue30: 30,
    RFValue31: 31,
    RFValue32: 32,
    RFValue33: 33,
    RFValue34: 34,
}

export const fontFamilyConstants = {
    ExtraLight: 'Roboto-Thin',
    Light: 'Roboto-Light',
    //=>roboto-regular is in small since uikitten themes uses this name for fonts
    Regular: 'roboto-regular',
    Normal: 'roboto-regular',
    Medium: 'Roboto-Medium',
    SemiBold: 'Roboto-Medium',
    Bold: 'Roboto-Medium',
    ExtraBold: 'Roboto-Bold',
    UltraBold: 'Roboto-Black',
}

const elevation = {
    shadowColor: '#000',
    borderRadius: 5,
    // paddingVertical: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, backgroundColor: 'white',
}

export const STYLES = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // zIndex: 2
        // opacity: 0.5,
        // backgroundColor: 'black',
    },
    elevation: {
        ...elevation
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    }

})