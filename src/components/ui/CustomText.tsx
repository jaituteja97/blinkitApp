import { View, Text, TextStyle } from 'react-native'
import React, { FC } from 'react'
import { Fonts } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';


interface Props {

    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body";
    fontFamily?: Fonts;
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLine?: number;
    onLayout?: (event: object) => void
   
}


const CustomText: React.FC<Props> = ({ style, children, numberOfLine, onLayout, fontSize, variant = "body", fontFamily = Fonts.Regular, ...props }) => {
    let computedFontSize;


    switch (variant) {
        case "h1":
            computedFontSize = RFValue(fontSize || 22);
            break;
        case "h2":
            computedFontSize = RFValue(fontSize || 20);
            break;
        case "h3":
            computedFontSize = RFValue(fontSize || 18);
            break;
        case "h4":
            computedFontSize = RFValue(fontSize || 16);
            break;
        case "h5":
            computedFontSize = RFValue(fontSize || 14);
            break;

        case "h6":
            computedFontSize = RFValue(fontSize || 12);
            break;

        case "h7":
            computedFontSize = RFValue(fontSize || 12);
            break;
        case "h8":
            computedFontSize = RFValue(fontSize || 10);
            break;
        case "h9":
            computedFontSize = RFValue(fontSize || 9);
            break;
        case "body":
            computedFontSize = RFValue(fontSize || 12);
            break;

    }

    return (
        <Text onLayout={onLayout} numberOfLines={numberOfLine != undefined ? numberOfLine : undefined} style={[style, { fontFamily: fontFamily, fontSize: fontSize,color : Colors.text}]} {...props}>{children}</Text>
    )
}

export default CustomText