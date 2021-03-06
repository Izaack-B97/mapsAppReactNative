import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers ?: Marker[]
}

export const Map = ( { markers } : Props ) => {
    
    const [ showPolyline, setShowPolyline ] = useState<Boolean>( false );

    const { 
        initialPosition, 
        hasLocation, 
        getCurrentLocation, 
        followUserLocation, 
        currentPosition,
        routeLines
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const followingRef = useRef<Boolean>( true );

    useEffect(() => {
        let remove : () => void;
        followUserLocation()
            .then(functionRemove => remove = functionRemove );

        return () => {
            remove();
        }
    }, []);

    // Following the user
    useEffect(() => {
        if ( !followingRef.current ) return;
        const { latitude, longitude } = currentPosition;
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        });
    }, [ currentPosition ])

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        followingRef.current = true;
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
                onTouchStart={ () => followingRef.current = false }
            >   
                { showPolyline && <Polyline coordinates={ routeLines } strokeWidth={ 3 } strokeColor="black" /> }
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
            <Fab 
                iconName="brush-outline"
                onPress={ () => setShowPolyline( !showPolyline ) }
                style={{
                    position: 'absolute',
                    bottom: 90,
                    right: 20,
                }}
            />


        </>
    )
}
