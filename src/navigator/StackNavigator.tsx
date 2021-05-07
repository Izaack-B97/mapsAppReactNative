import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { PermissionsScreen } from '../screens/PemissionsScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {

    const { permissions: { locationStatus } } = useContext( PermissionsContext );

    if ( locationStatus === 'unavailable' ){
        return (
            <LoadingScreen />
        )
    }
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            {
                (locationStatus === 'granted')
                    ? <Stack.Screen name="MapScreen" component={ MapScreen } />
                    : <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
            }
        </Stack.Navigator>
    );
}