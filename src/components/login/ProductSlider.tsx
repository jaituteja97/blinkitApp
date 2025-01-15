import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import React, { FC, useMemo } from 'react';
import { imageData } from '../../utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenHeight, screenWidth } from '../../utils/Scaling';

const ProductSlider = React.memo(() => {

    const memoizedRows = useMemo(() => {
        const result = [];
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4));
        }
        return result;
    }, [imageData]);

    return (
        <View pointerEvents='none'>
            <AutoScroll endPaddingWidth={0} duration={10000} style={styles.autoScroll}>
                <View>
                    {memoizedRows.map((row, rowIndex) => {
                        return (
                            <MemorizeRow key={rowIndex} rowIndex={rowIndex} row={row}></MemorizeRow>
                        )
                    })}
                </View>
            </AutoScroll>
        </View>
    );
});

interface MemorizeRow {

    rowIndex: number,
    row: any,

}

const MemorizeRow: FC<MemorizeRow> = ({ rowIndex, row }) => {
    return (
        <View style={styles.row} key={rowIndex}>{row.map((imageSource : any,imageIndex : any) => {
            const horizontalShift = rowIndex % 2 == 0 ? -18 : 18
            return (
                <View key={imageIndex} style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]}>
                    <Image
                        key={imageIndex}
                        source={imageSource}
                        style={styles.image}
                    />
                </View>
            )
        })}</View>
    )
}

const styles = StyleSheet.create({

    autoScroll:
    {
        position: "absolute",
        zIndex: -2
    },

    row: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",

    },
    itemContainer:
    {
        marginHorizontal: 10,
        height: screenWidth * 0.23,
        width: screenWidth * 0.23,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 25,
        backgroundColor : "#ececec",
    }
});

export default ProductSlider;
