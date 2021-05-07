import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    title   : string,
    onPress : () => void,
    style  ?: StyleProp<ViewStyle>
}

export const BlackButton = ( { title, onPress, style = {} } : Props ) => {
    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ onPress }
            style={{
                ...style as any,
                ...styles.blackButton
            }}
        >
            <Text style={ styles.title }>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blackButton : {
        height: 50,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }
});
