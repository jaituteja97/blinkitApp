import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../redux/store';
import userSlice from '../../redux/slice/userSlice';
import { resetAndNavigate } from '../../utils/NavigationUtils';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
})


const SplashScreen = () => {
    const dispatch = useDispatch();
    const userSlice = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                Geolocation.requestAuthorization();
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Position:', position);
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
        const accessToken = userSlice.accessToken;
        console.log("Access token:", accessToken);
        if (accessToken) {
            resetAndNavigate("CustomerDashboard");
        } else {
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
