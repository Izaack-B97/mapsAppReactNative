import React, { useContext, useEffect } from 'react'
import { View, Text, Platform, Permission, Button, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {
    
    const { top } = useSafeAreaInsets();
    const { permissions, askLocationPermission } = useContext( PermissionsContext );

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: top,
                flex:  1
            }}
        >
            <Text style={ styles.title }>Es necesario el uso de GPS para usar esta aplicacion</Text>
            <BlackButton 
                title='Permitir uso del GPS' 
                onPress={ askLocationPermission  }
            />
            <Text style={{ ...styles.title, marginBottom:0, marginTop: 10}} >{ JSON.stringify( permissions, null, 3 ) }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        width: 250,
        textAlign: 'center',
        marginBottom: 10
    }
});