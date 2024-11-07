import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store'
import { navigationRef } from './src/utils/NavigationUtils'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';


const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer ref={navigationRef}>
    <Navigation/>
    </NavigationContainer>
    </PersistGate>
  </Provider>

  )
}

export default App