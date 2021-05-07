import React from 'react'
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MapScreen = () => {
    
    const { top } = useSafeAreaInsets();

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: top
            }}
        >
            <Text>MapScreen</Text>
        </View>
    )
}
