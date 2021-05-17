import React, { useRef } from 'react'
import { ActivityIndicator, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers ?: Marker[]
}

export const Map = ( { markers } : Props ) => {
    
    const { initialPosition , hasLocation, getCurrentLocation } = useLocation();
    const mapViewRef = useRef<MapView>();

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        mapViewRef.current!.animateCamera({
            center: {
                latitude,
                longitude
            }
        })
    };

    if ( hasLocation ) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MapView
                ref={ el => mapViewRef.current = el ! }
                // provider={ PROVIDER_GOOGLE }
                style={{ flex: 1 }}
                showsUserLocation={ true }
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* <Marker
                    image={ require('../../assets/custom-marker.png') }
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324        
                    }}
                    title="Esto es un titulo"
                    description="Esta es mi descripcion"
                />     */}

            </MapView>  
            <Fab 
                iconName="compass-outline"
                onPress={ centerPosition }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                }}
            />
        </>
    )
}
