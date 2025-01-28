import { View, Text, StyleSheet, Animated as RnAnimated } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../utils/Constants'
import Notice from '../../components/dashboard/Notice'
import { NoticeHeight } from '../../utils/Scaling'

interface props {
    noticePosition: any,
    children: React.ReactNode
}

const NOTICE_HEIGHT = -(NoticeHeight + 12)



const NoticeAnimation: FC<props> = ({ noticePosition, children }) => {
    return (
        <View style={styles.continue}>
            <RnAnimated.View style={[styles.noticeContainer, { transform: [{ translateY: noticePosition }] }]}>
                <Notice></Notice>
            </RnAnimated.View>
            <RnAnimated.View style={[styles.contentContainer, {
                paddingTop: noticePosition.interpolate({
                    inputRange: [NOTICE_HEIGHT, 0],
                    outputRange: [0, NOTICE_HEIGHT + 20]
                })
            }]}>
                {children}
            </RnAnimated.View>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        noticeContainer:
        {
            width: "100%",
            position: "absolute",
            zIndex: 999,
        },
        contentContainer:
        {
            flex: 1,
            width: "100%",
        },


        continue:
        {
            flex: 1,
            backgroundColor: "white"
        }

    }
)



export default NoticeAnimation