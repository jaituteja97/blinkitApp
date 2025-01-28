import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import CustomText from '../../components/ui/CustomText'
import { Fonts } from '../../utils/Constants'
import { screenHeight } from '../../utils/Scaling'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CustomInput from '../../components/ui/CustomInput'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomButton from '../../components/ui/CustomButton'
import { deliveryLogin } from '../../service/authService'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { resetAndNavigate } from '../../utils/NavigationUtils'



const DeliveryLogin = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>();


  const handleLogin = async () => 
  {
    await dispatch(deliveryLogin(email,password))
  }

  return (
    <GestureHandlerRootView>
      <CustomSafeAreaView>
        <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.lottieContainer} >
              <LottieView style={styles.lottie} source={require('../../assets/animations/delivery_man.json')} autoPlay loop />
            </View>
            <CustomText  variant='h3' fontFamily={Fonts.Bold} >Delivey Partner Portal</CustomText>
              <CustomText style={styles.text} variant='h6' fontFamily={Fonts.SemiBold} >Faster then Flash </CustomText>
              <CustomInput
                onChangeText={setEmail}
                value={email}
                placeholder='Email'
                inputMode='email'
                right={false}
                left={<Icon size={RFValue(18)} name="mail" color={'#F8890E'} style={{ marginLeft: 10 }} />}
              >

              </CustomInput>
              <CustomInput
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                secureTextEntry
                right={false}

                left={<Icon size={RFValue(18)} name="key-sharp" color={'#F8890E'} style={{ marginLeft: 10 }} />}
              >
              </CustomInput>
              <CustomButton onPress={handleLogin}  title={'Continue'} disable={(email.length ==0 || password.length < 8)} loadingState={isLoading}              
            
            ></CustomButton>
          </View>
         
        </ScrollView>

      </CustomSafeAreaView>
    </GestureHandlerRootView>

  )
}


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  lottie:
  {
    height: "100%",
    width: "100%"
  },
  lottieContainer:
  {
    height: screenHeight * 0.12,
    width: "100%",
  },


  text:
  {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  }
})

export default DeliveryLogin