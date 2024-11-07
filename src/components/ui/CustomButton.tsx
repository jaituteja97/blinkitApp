import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomText from './CustomText'
import { Colors, Fonts } from '../../utils/Constants'


interface CustomButtonProps {
    onPress: () => void,
    title: string,
    disable: boolean,
    loadingState: boolean,
    style?: ReactNode,
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, title, disable, loadingState, style, ...props }) => {
    return (
        <View style = {styles.contianer}>
            <TouchableOpacity disabled={disable} activeOpacity={0.8} onPress={onPress} style={[styles.buttonStyle, { backgroundColor: disable ? Colors.disabled : Colors.secondary }]}>
                {loadingState ? <ActivityIndicator color={"white"} size={'small'} /> : <CustomText style={styles.text} variants='h6' fontFamily={Fonts.SemiBold}>{title}</CustomText>}
            </TouchableOpacity>
        </View>

    )
}

export default CustomButton


const styles = StyleSheet.create({

    contianer : 
    {
        width : "100%",
    },
    buttonStyle:
    {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        width: "100%",
    },
    

    text:
    {
        color: "#ffff",

    }

})