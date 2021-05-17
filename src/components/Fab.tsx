import React from 'react'
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    iconName : string,
    onPress  : () => void,
    style   ?: StyleProp<ViewStyle>
}

export const Fab = ( { iconName, onPress, style={} } : Props ) => {
    return (
        <View style={{ ...style as any }}>
            <TouchableOpacity 
                activeOpacity={0.6} 
                style={ styles.blackButton }
                onPress={ onPress }
            >
                <Ionicons name={ iconName as any } size={  35 } color="white" style={{ left: 1 }}/>
            </TouchableOpacity>      
        </View>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 9999,
        width: 60,
        height: 60,
        backgroundColor: 'black',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
});
