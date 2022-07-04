import React from "react";
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import { registerRootComponent } from 'expo';
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
import { store } from "./src/redux/store";
import { Provider } from 'react-redux';
import RootAppComponent from './App';
const persistedStore = persistStore(store)

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


const App = () => {
  return <Provider store={store}>
    <PersistGate persistor={persistedStore} loading={null}>
      <RootAppComponent />
    </PersistGate>
  </Provider>
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
