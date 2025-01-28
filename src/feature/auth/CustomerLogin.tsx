import { View, Text, StyleSheet, Image, Keyboard, Alert } from 'react-native'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import ProductSlider from '../../components/login/ProductSlider'
import { imageData } from '../../utils/dummyData'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { resetAndNavigate } from '../../utils/NavigationUtils'
import CustomText from '../../components/ui/CustomText'
import { Colors, Fonts, lightColors } from '../../utils/Constants'
import CustomInput from '../../components/ui/CustomInput'
import CustomButton from '../../components/ui/CustomButton'
import useKeyboardOffsetHeight from '../../utils/keyboardoffsetHeight'
import { RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'
import { customerLogin } from '../../service/authService'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store' 


const bottomColors = [...lightColors].reverse()

const CustomerLogin: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useSharedValue(0);

  
  useEffect(() => {
    if (keyboardOffsetHeight > 0) {
      animatedValue.value = withTiming(keyboardOffsetHeight * -0.8, {
        duration: 300,
      });
    } else {
      animatedValue.value = withTiming(0, {
        duration: 300,
      });
    }
  }, [keyboardOffsetHeight]);
  
  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'Right' : 'Left';
      } else {
        direction = translationY > 0 ? 'Down' : 'Up';
      }

      let newSequence = [...gestureSequence, direction].slice(-4)
      setGestureSequence(newSequence);
      if (newSequence.join(' ') == "Right Left Up Down") {
        resetAndNavigate('DeliveryLogin')
      }
    }
  };
  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await dispatch(customerLogin(phoneNumber)); 
    
    } catch (e) {
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <GestureHandlerRootView style={style.container}>
      <View style={style.container}>
        <CustomSafeAreaView>
          <ProductSlider></ProductSlider>
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView style={{transform : [{translateY : animatedValue}]}} bounces={false} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'} contentContainerStyle={style.subContainer}>
              <LinearGradient 
               colors={bottomColors} style = {style.gradiant} />
              <View style={style.content}>
                <Image style={style.logo} source={require('../../assets/images/logo.png')}></Image>
                <CustomText variant='h2' fontFamily={Fonts.Bold}>India's Last minute app</CustomText>
                <CustomText style={style.text} variant='h5' fontFamily={Fonts.SemiBold}>Log in or sign up</CustomText>
                <CustomInput inputMode='numeric' placeholder='Enter Mobile Number' left={<CustomText fontFamily={Fonts.SemiBold} variant='h6' style={style.phoneText}> + 91</CustomText>} value={phoneNumber} onChange={(event: any) => setPhoneNumber(event.nativeEvent.text.slice(0, 10)
                )} onClear={() => setPhoneNumber('')} ></CustomInput>
                <CustomButton title='Continue' onPress={handleAuth}
                  disable={phoneNumber.length != 10} loadingState={false}></CustomButton>
              </View>
      
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>

      </View>
      <View style = {style.fotter}>
      <CustomText style={style.fotterText} fontSize={RFValue(6)}>By Continuing, you agree to our Terms of Services & Privacy Policy</CustomText>  
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
    marginBottom : 20,
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
    marginHorizontal: 10,
  },
  fotter : 
  {
     borderTopWidth : 0.8,
      fontFamily : Fonts.Regular, 
      borderColor : Colors.border,
      paddingBottom : 10,
      position : 'absolute',
      zIndex : 2,
      bottom : 0,
      width : '100%',
      justifyContent : "center",
      alignItems : "center",
      padding : 10,
      backgroundColor : "#f8f9fc"
        
  },
  fotterText: 
  {
      marginBottom : 10,
  },
  gradiant: 
  {
    paddingTop : 60,
    width : "100%",
  }
})


export default CustomerLogin