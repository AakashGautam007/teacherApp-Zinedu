import { combineReducers } from 'redux'
import authReducer from './authReducer'
import counterReducer from './counterSlice';
// import { reducer as network } from 'react-native-offline';

const rootReducer = combineReducers({
    authReducer,
    counter: counterReducer,
    // network
})

export default rootReducer;