import React from 'react'
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Map } from '../components/Map';

export const MapScreen = () => {
    
    const { top } = useSafeAreaInsets();
    return (
        <View style={ styles.container } >
            <Map />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
});