import React, { FC, ReactNode } from "react";
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputProps extends TextInputProps {
    left?: ReactNode;
    onClear?: () => void;
    right?: boolean;
}

const CustomInput: FC<InputProps> = ({ onClear, left, right = true, style, ...props }) => {
    return (
        <View style={styles.flexRow}>
            {left && <View style={styles.leftContainer}>{left}</View>}
            <TextInput
                {...props}
                style={[styles.inputContainer, style]}
                placeholderTextColor="#ccc"
            />
            {right && props?.value?.length ? (
                <TouchableOpacity onPress={onClear} style={styles.icon}>
                    <Ionicons name="close-circle-sharp" size={RFValue(18)} color="#ccc" />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 0.5,
        marginVertical: 10,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowColor: Colors.border,
        borderColor: Colors.border,
    },
    leftContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight : 10,
        
    },
    inputContainer: {
        flex: 1,
        fontFamily: Fonts.SemiBold,
        fontSize: RFValue(12),
        paddingVertical: 14,
        color: Colors.text,
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10,
    },
});

export default CustomInput;
