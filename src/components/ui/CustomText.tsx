import { StyleSheet, Text, TextStyle } from "react-native";
import { Colors, Fonts } from "../../utils/Constants";
import React, { FC, ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
    variants?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body";
    fontFamily?: Fonts;
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: ReactNode;
    numberofLines?: number;
    onLayout?: (event: object) => void,
}

const CustomText: FC<Props> = ({ variants = 'body', fontFamily = Fonts.Regular, fontSize, style, children, numberofLines, onLayout, ...props }) => {

    let computedfontSize: number;

    switch (variants) {
        case 'h1':
            computedfontSize = RFValue(fontSize || 22);
            break;
        case 'h2':
            computedfontSize = RFValue(fontSize || 20);
            break;
        case 'h3':
            computedfontSize = RFValue(fontSize || 18);
            break;
        case 'h4':
            computedfontSize = RFValue(fontSize || 16);
            break;
        case 'h5':
            computedfontSize = RFValue(fontSize || 14);
            break;

        case 'h6':
            computedfontSize = RFValue(fontSize || 12);
            break;
        case 'h7':
            computedfontSize = RFValue(fontSize || 12);
            break;


        case 'h8':
            computedfontSize = RFValue(fontSize || 10);
            break;

        case 'h9':
            computedfontSize = RFValue(fontSize || 9);
            break;
        case 'body':
            computedfontSize = RFValue(fontSize || 12);
            break;
    }



    return (
        <Text numberOfLines={numberofLines !== undefined ? numberofLines : undefined} onLayout={onLayout} style={[styles.text, { color: Colors.text, fontFamily: fontFamily, fontSize: computedfontSize }, style]}{...props}>{children}</Text>
    );
}

const styles = StyleSheet.create({

    text: {
        textAlign: 'left',
    }

})

export default CustomText;