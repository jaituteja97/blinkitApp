import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../redux/store';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
})


const SplashScreen = () => {

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                Geolocation.requestAuthorization();
            } catch (error) {
             
                console.error('Permission request error:', error);
            }
        };

        requestLocationPermission();
    }, []);
    
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user);
    console.log(accessToken);

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
