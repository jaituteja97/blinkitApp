import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, useMemo, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import ProductSlider from '../../components/login/ProductSlider'
import { imageData } from '../../utils/dummyData'
import Animated from 'react-native-reanimated'
import { resetAndNavigate } from '../../utils/NavigationUtils'
import CustomText from '../../components/ui/CustomText'
import { Fonts } from '../../utils/Constants'
import CustomInput from '../../components/ui/CustomInput'
import CustomButton from '../../components/ui/CustomButton'

const CustomerLogin: FC = () => {

  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'Right' : 'Left';
      } else {
        direction = translationY > 0 ? 'Down' : 'Up';
      }

      console.log(direction);
      let newSequence = [...gestureSequence, direction].slice(-4)
      setGestureSequence(newSequence);
      console.log(newSequence);
      if (newSequence.join(' ') == "Right Left Up Down") {
        resetAndNavigate('DeliveryLogin')
      }

    }
  };

  const handleAuth = async () => {
    
  }

  return (
    <GestureHandlerRootView style={style.container}>
      <View style={style.container}>
        <CustomSafeAreaView>
          <ProductSlider></ProductSlider>
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView bounces={false} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'} contentContainerStyle={style.subContainer}>
              <View style={style.content}>
                <Image style={style.logo} source={require('../../assets/images/logo.png')}></Image>
                <CustomText variants='h2' fontFamily={Fonts.Bold}>India's Last minute app</CustomText>
                <CustomText style={style.text} variants='h5' fontFamily={Fonts.SemiBold}>Log in or sign up</CustomText>
                <CustomInput inputMode='numeric' placeholder='Enter Mobile Number' left={<CustomText fontFamily={Fonts.SemiBold} variants='h6' style={style.phoneText}> + 91</CustomText>} value={phoneNumber} onChange={(event: any) => setPhoneNumber(event.nativeEvent.text.slice(0, 10)
                )} onClear={() => setPhoneNumber('')} ></CustomInput>
                <CustomButton title='Continue' onPress={() => {
                    
                 }}
                disable={phoneNumber.length != 10} loadingState={false}></CustomButton>
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
      </View>

    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  container:
  {
    flex: 1,
  },

  text:
  {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8
  },
  subContainer:
  {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  animatedContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  content:
  {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  logo:
  {
    height: 50,
    width: 50,
    marginVertical: 10,
    borderRadius: 20,
  },
  phoneText:
  {
    marginEnd: 10,
  },
})


export default CustomerLogin