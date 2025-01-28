import { View, Text, Animated as  RNAnimated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight } from '../../utils/Scaling'


const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard = () => {

  const noticePosition = useRef(new RNAnimated.Value((NOTICE_HEIGHT))).current;


  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  

    useEffect(() => 
    {
      slideDown();
      const timeout = setTimeout(() => 
      {
          slideUp();
      },3500)
      return () => clearTimeout(timeout)
    },[])


  return (

   <NoticeAnimation noticePosition={noticePosition} children={(<>
        <Text>Product Dashboard</Text>
   </>)}> 

   </NoticeAnimation>
  )
}

export default ProductDashboard