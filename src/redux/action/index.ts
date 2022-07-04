import { SET_TOKEN, UPDATE_USER_DETAILS, RESET_REDUX, SET_FIELDS } from './types'

let show = false
export const setTokens = (token) => {
    show && console.log('redux setTokens called', token)
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const updateUserDetails = (values) => {
    show && console.log('redux update userDetails called', values)
    return {
        type: UPDATE_USER_DETAILS,
        payload: values
    }
}

export const setFields = (values) => {
    show && console.log('redux setFields called', values)
    return {
        type: SET_FIELDS,
        payload: values
    }
}

export const resetRedux = (values = undefined) => {
    //if values is not undefined asyncstorage will be cleared
    show && console.log('redux reset called')
    return {
        type: RESET_REDUX,
        payload: values
    }
}