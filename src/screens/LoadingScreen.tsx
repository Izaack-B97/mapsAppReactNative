import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LoadingScreen = () => {
    // const { top } = useSafeAreaInsets();
    
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: top,
                flex:  1
            }}
        >
            <ActivityIndicator size={ 50 } color='blue'/>
        </View>
    )
}
