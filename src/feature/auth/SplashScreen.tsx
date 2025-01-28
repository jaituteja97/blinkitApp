import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import userSlice from '../../redux/slice/userSlice';
import { resetAndNavigate } from '../../utils/NavigationUtils';
import { jwtDecode } from 'jwt-decode';
import { refechUser, refresh_token } from '../../service/authService';


Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
})

interface DecordToken {
    exp: number,
}

const SplashScreen = () => {
    const userSlice = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                Geolocation.requestAuthorization();
                Geolocation.getCurrentPosition(
                    (position) => {
                        tokenCheck();
                    },
                    (error) => {
                        console.error('Location error:', error);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } catch (error) {

                console.error('Permission request error:', error);
            }
        };

        requestLocationPermission();
    }, []);

    const tokenCheck = async () => {

   

        let accessToken = userSlice.accessToken
        let refreshToken = userSlice.refreshToken


        if (accessToken && refreshToken) {
            const decordAccessToken = jwtDecode<DecordToken>(accessToken);
            const decordRefreshToken = jwtDecode<DecordToken>(refreshToken);
            const currentTime = Date.now() / 1000;

            if (decordRefreshToken.exp < Date.now() / 1000) {
                resetAndNavigate("CustomerLogin");
                Alert.alert("Token Expired")
                return false
            }
            else if (decordAccessToken.exp < Date.now() / 1000) {
                try {
                    await refresh_token();
                    await refechUser();
                }
                catch (error) {
                    Alert.alert("There was and error in refreshing token")
                }
            }
            if (userSlice?.user?.role == "Customer") {
                
                resetAndNavigate("ProductDashboard");
            }
            else if(userSlice?.user?.role == "DeliveryPartner") {
                resetAndNavigate("DeliveryDashboard");
            }
        }

       else
       {
        resetAndNavigate("CustomerLogin");
       }
    };


    return (
        <View style={style.container}>
            <Image source={require('../../assets/images/splash_logo.jpeg')} style={style.logoImage} />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary
    },
    logoImage: {
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: "contain",
    }
});

export default SplashScreen;
