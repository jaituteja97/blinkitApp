import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CustomerSafeAreaViewProps {
  children: ReactNode,
  style?:ViewStyle,

}

const CustomSafeAreaView:FC<CustomerSafeAreaViewProps> = ({children,style}) => {
  return (
    <SafeAreaView style = {[styles.conatiner,style]}>
      <View style = {[styles.conatiner,style]}>{children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
  {
    conatiner : {
      flex : 1,
      backgroundColor : "white"
    }
  }
)

export default CustomSafeAreaView