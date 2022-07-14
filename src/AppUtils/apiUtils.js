// import moment from 'moment';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { store } from '../redux/store'
// import { handleCookies, IsIOS } from './CommonUtils';
// import { CHECK_TOKEN } from './Logout';
let show = false

export const apiMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

//doFetch(url=> endpoint, type=> method, data=>params, isFile=> is a file upload)
export const doFetch = async (url, type, data = null, isFile = false, tempToken = undefined, signal = undefined) => {
    let reqData;
    let token
    console.log({ data })
    if (data === null || data === undefined) {
        reqData = {};
    } else if (isFile) {
        //if formdata
        reqData = data
    } else {
        //if normal data
        reqData = { ...data };
    }
    if (tempToken) {
        token = tempToken
    } else if (store?.getState()?.authReducer?.userToken) {
        token = store.getState().authReducer.userToken
    }
    let headers, body = reqData
    if (token) {
        if (isFile) {
            headers = {
                'Authorization': `Token ${token}`
            }
        } else {
            if (type !== apiMethods.GET) {
                headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                    // 'Authorization': `Token ${token}`,
                    // "content-type": "Application/json"
                }
                body = JSON.stringify({ ...reqData })
            } else {
                headers = {
                    // "x-auth-token": token
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }
        }
    } else {
        headers = {
            // "content-type": "Application/json"

            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Token ${token}`
        }
        if (type !== apiMethods.GET && !isFile) {
            body = JSON.stringify({ ...reqData })
        }
    }
    console.log('dofetch params', url, type, body, headers)
    let signalData = {};
    if (signal) {
        signalData = { signal };
    }
    return fetch(url, {
        // redirect: 'follow',
        method: type,
        headers: {
            ...headers,
            // 'Cache-Control': 'no-store'
        },
        body: type !== apiMethods.GET ? body : null,
        // credentials: 'include',
        // cache: 'no-store',
        ...signalData
    })
        // .then(handleCookies)
        .then((res) => res.json())
        .then((responseJson) => {
            console.log('response from api', responseJson)
            // CHECK_TOKEN(responseJson)
            return responseJson
        })
        .catch((err) => console.log(err));
};

// export const downloadFetch = async (url, type, receiptId, isShare = false, text = '') => {
//     let token = store.getState().authReducer.token
//     let headers
//     headers = {
//         "x-auth-token": token,
//         'Cache-Control': 'no-store'
//     }

//     let path = `${text ? text : 'receipt'}` + `${moment(new Date()).format('DDMMYYYYhhmmss')}`.split(' ').join('') + '.pdf'
//     let fileName = receiptId
//     // let path = `${dirToSave + '/' + fileName + '.pdf'}`
//     // // console.log('path', path)
//     // let config = {
//     //     // add this option that makes response data to be stored as a file,
//     //     // this is much more performant.
//     //     fileCache: true,
//     //     path: path,
//     //     addAndroidDownloads: {
//     //         useDownloadManager: true,
//     //         notification: true,
//     //         description: 'Invoice',
//     //         mediaScannable: true,
//     //         mime: 'application/pdf',
//     //         title: fileName,
//     //         // title: 'invoice',
//     //         path: path
//     //         // path: `${dirs.DownloadDir}`,
//     //     },
//     // }

//     const { dirs } = RNFetchBlob.fs;
//     let dirToSave, configValue = true
//     if (isShare) {
//         dirToSave = dirs.CacheDir
//         configValue = false
//     } else {
//         dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
//     }
//     const configfb = {
//         fileCache: configValue,
//         useDownloadManager: configValue,
//         notification: configValue,
//         mediaScannable: configValue,
//         title: fileName,
//         path: `${dirToSave}/${path}`,
//     }
//     let configOptions
//     if (IsIOS()) {
//         configOptions = {
//             fileCache: configfb.fileCache,
//             title: configfb.title,
//             path: configfb.path,
//             appendExt: 'pdf',
//         }
//     } else {
//         configOptions = configfb
//     }
//     // configOptions = Platform.select({
//     //     ios: {
//     //         fileCache: configfb.fileCache,
//     //         title: configfb.title,
//     //         path: configfb.path,
//     //         appendExt: 'pdf',
//     //     },
//     //     android: configfb,
//     // });
//     // return RNFetchBlob.config(config)
//     return RNFetchBlob.config(configOptions)
//         .fetch(type, url, headers)
//         .then(handleCookies)
//         .then((res) => {
//             // console.log('ressssss', res)
//             if (Platform.OS == 'ios') {
//                 return res?.respInfo?.status === 200 ? res : res.json();
//             } else {
//                 //==>unlike ios response had only this rnfdbEncode so used it
//                 return res?.respInfo?.rnfbEncode === "path" ? res : res.json();
//             }

//             // if(res?.json()){
//             //     CHECK_TOKEN(res.json())
//             // }
//             // return res
//         })
//         // Something went wrong:
//         .catch((errorMessage) => {
//             // error handling
//             console.log('error', errorMessage)
//         })
// };


// export const doFetchLos = async (url, type, data, isFile = false, tempToken = undefined) => {
//     let reqData;
//     let token
//     if (data === null || data === undefined) {
//         reqData = {};
//     } else if (isFile) {
//         //if formdata
//         reqData = data
//     } else {
//         //if normal data
//         reqData = { ...data };
//     }
//     if (tempToken) {
//         token = tempToken
//     } else if (store?.getState()?.losReducer?.losToken) {
//         token = store.getState().losReducer.losToken
//     }
//     let headers, body = reqData
//     if (token) {
//         if (isFile) {
//             headers = {
//                 "x-auth-token": token
//             }
//         } else {
//             if (type !== "GET") {
//                 headers = {
//                     "x-auth-token": token,
//                     "content-type": "Application/json"
//                 }
//                 body = JSON.stringify({ ...reqData })
//             } else {
//                 headers = {
//                     "x-auth-token": token
//                 }
//             }
//         }
//     } else {
//         headers = {
//             "content-type": "Application/json"
//         }
//         if (type !== "GET" && !isFile) {
//             body = JSON.stringify({ ...reqData })
//         }
//     }
//     console.log('dofetchLos params', url, type, body, headers)
//     return fetch(url, {
//         method: type,
//         headers: {
//             ...headers,
//             'Cache-Control': 'no-store'
//         },
//         body: type !== "GET" ? body : null,
//         credentials: 'include',
//         cache: 'no-store'
//     })
//         .then(handleCookies)
//         .then((res) => res.json())
//         .then((responseJson) => {
//             // console.log('response from api', responseJson)
//             CHECK_TOKEN(responseJson)
//             return responseJson
//         })
//         .catch((err) => console.log(err));
// };