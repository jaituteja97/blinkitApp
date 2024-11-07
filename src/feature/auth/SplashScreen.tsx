import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { resetAndNavigate } from '../../utils/NavigationUtils';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
});

const SplashScreen = () => {
    const dispatch = useDispatch();
    const userSlice = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                console.log("Requesting location permission...");
                
                // Request authorization and check if granted
                Geolocation.requestAuthorization();
                Geolocation.getCurrentPosition(
                    async () => {
                        console.log("Permission granted.");
                        await tokenCheck();
                    },
                    error => console.error("Permission request error:", error),
                     
                );
            } catch (error) {
                console.error('Permission request error:', error);
            }
        };
        requestLocationPermission();
    }, []);

    const tokenCheck = async () => {
        const accessToken = userSlice.accessToken;
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
        backgroundColor: Colors.primary,
    },
    logoImage: {
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: "contain",
    },
});

export default SplashScreen;
