import React, { useState, createContext, useEffect } from 'react'
import * as Location from 'expo-location';
import { AppState, Linking, Platform } from 'react-native';

export interface PermissionsState {
    locationStatus: any
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable'
}

type PermissionsContextProps = {
    permissions: PermissionsState,
    askLocationPermission: () => void,
    checkLocationPermission: () => void
}

export const PermissionsContext = createContext( {} as PermissionsContextProps );


export const PermissionsProvider = ({ children } : any) => {
    
    const [ permissions , setPermissions ] = useState( permissionInitState )

    useEffect(() => {

        checkLocationPermission();

        AppState.addEventListener('change', status => {
            console.log(  status )
            if ( status !== 'active' ) return ;
            checkLocationPermission();
        });
    }, [])

    const askLocationPermission = async () => {
        const { status : statusLocation } = await Location.requestForegroundPermissionsAsync(); // Solicitamos el permiso del GPS
        
        if ( statusLocation === 'denied' ) {
            Linking.openSettings();
        }
        
        setPermissions({
            ...permissions,
            locationStatus: statusLocation
        })
    }
    
    const checkLocationPermission = async () => {
        const { status } = await Location.getForegroundPermissionsAsync(); // Obtienen los permisos de localizacion cuando la aplicacion esta activa
        // console.log( status );
        
        setPermissions({
            ...permissions,
            locationStatus: status
        })
    }

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            { children }
        </PermissionsContext.Provider>
    )
}


