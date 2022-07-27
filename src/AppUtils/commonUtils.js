import { CommonActions } from "@react-navigation/native";
import NavigationService from "./NavigationService"

//=>To ResetToInitialScreen
export const resetToInitialScreen = (props) => {
    const { navigation, screen } = props
    // setTimeout(() => {
    //     navigation.dispatch(
    //         CommonActions.reset({
    //             index: 0,
    //             routes: [{ name: screen ? screen : '' }],
    //         })
    //     );
    // }, 100)
}

export const CHECK_TOKEN = (response) => {
    // React.useEffect(() => {
    // let error_code = response?.error_code
    // if (error_code === '1001' || error_code === 1001) {
    //     NavigationService.navigate()
    //     return false
    // } 
    // else if (+error_code === 2002 || +error_code === 2003 || +error_code === 2004) {
    //     NavigationService.navigateToPremium()
    //     return true
    // } 
    //     else {
    //     //=> if the response is valid
    //     return true
    // }
    let error_code = response?.detail
    if (error_code?.includes('Invalid token')) {
        NavigationService.resetToInitialScreen()
        return false
    } else {
        //=> if the response is valid
        return true
    }
}

export const roundOff = (value, decimal) => {
    const temp = Number(value)
    if (decimal) {
        return Math.round((temp + Number.EPSILON) * 100) / 100
    }
    return Math.round(temp)
}

export const fileToApiFormat = (file) => {
    let temp = {
        // ...item
        name: file['fileName'] || file['name'],
        type: file['type'],
        // uri: Platform.OS === 'android' ? item['uri'] : item['uri'].replace('file://', '')
        uri: file['uri']
    }
    return temp
}

export const compareTwoArrays = (arrA = [], arrB = []) => {

    //check if lengths are different
    if (arrA.length !== arrB.length) return false;

    //slice so we do not effect the original
    //sort makes sure they are in order
    //join makes it a string so we can do a string compare
    var cA = arrA.slice().sort().join(",");
    var cB = arrB.slice().sort().join(",");

    return cA === cB;
}

export const handleApiErrors = ({ response, callback } = {}) => {
    if (response && response?.message) {
        callback && callback()
    } else {
        callback ? callback : alert('Some Error occured')
    }
}