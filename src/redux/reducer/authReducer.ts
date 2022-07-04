// import { SET_TOKEN, UPDATE_USER_DETAILS, RESET_REDUX } from "../action/types";
// // import CookieManager from "@react-native-community/cookies";


// const initialState = {
//     token: '',
//     onBoarding: true,
//     // authToken: '',
//     // refreshToken: '',
//     // authTime: '',
//     // username: '',
//     name: '',
//     profileImage: '',
//     bounty: '',
//     isLoggedIn: false,
//     _id: '',
//     mobileNumber: '',
//     address: '',
//     roles: '',
//     nav: {},
//     pendingFees: [],
//     tour: true,
//     isTourShowing: false,
//     showDrawer: false,
//     institutionType: '',
//     confirmationMessage: true,
//     selectedMonth: '',
//     alumni: false
// }

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_USER_DETAILS:
//             return {
//                 ...state,
//                 // token: action.payload.token ? action.payload.token : state.token,
//                 // authToken: action.payload.authToken ? action.payload.authToken : state.authToken,
//                 // refreshToken: action.payload.refreshToken ? action.payload.refreshToken : state.refreshToken,
//                 // authTime: action.payload.authTime ? action.payload.authTime : state.authTime,
//                 // username: action.payload.username ? action.payload.username : state.username,
//                 name: action.payload.name ? action.payload.name : state.name,
//             }
//         case SET_TOKEN:
//             return {
//                 ...state,
//                 token: action.payload.token ? action.payload.token : state.token,
//                 isLoggedIn: action.payload.isLoggedIn ? action.payload.isLoggedIn : state.isLoggedIn,
//             }
//         case RESET_REDUX: {
//             if (action.payload) {
//                 // CookieManager.clearAll().then(clear => {
//                 //     console.log('cookie cleared', clear)
//                 // })
//             }
//             return initialState
//         }
//         default:
//             return state
//     }
// }

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userToken: '',
    userName: '',
    fcmToken: ''
}

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthValues: (state, action) => {
            if (action.payload?.userToken) {
                state.userToken = action.payload?.userToken
            }
            if (action.payload?.userName) {
                state.userName = action.payload?.userName
            }
            if (action.payload?.fcmToken) {
                state.fcmToken = action.payload?.fcmToken
            }
        },
        resetAuthValues: (state, action) => {
            state.userName = '',
                state.fcmToken = '',
                state.userToken = ''
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuthValues, resetAuthValues } = authSlice.actions

export default authSlice.reducer