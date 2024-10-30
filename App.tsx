import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Navigation></Navigation>
    </PersistGate>
  </Provider>

  )
}

export default App