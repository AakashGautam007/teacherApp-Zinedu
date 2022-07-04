import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'
import reducer from '../reducer'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        //authReducer is whitlisted
        'authReducer',
    ]
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})