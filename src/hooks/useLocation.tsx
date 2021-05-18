import { useEffect, useRef, useState } from "react";
import * as Location from 'expo-location';
import { Platform } from "react-native";
import { Locations } from '../interfaces/appInterfaces';

export const useLocation = () => {
    
    const [ hasLocation, setHasLocation ] = useState( true );
    const [ initialPosition, setInitialPosition ] = useState<Locations>({ latitude: 0, longitude: 0 });
    const [ currentPosition, setCurrentPosition ] = useState<Locations>({ latitude: 0, longitude: 0 });
    const cleanWatchRef = useRef<() => void>();

    const getCurrentLocation  = async () => {
        const resp = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
        const { coords } = resp;
        return coords;
    };

    const followUserLocation = async () => {
        const subscriber = await Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.BestForNavigation,
            timeInterval: 5000,
            distanceInterval: 100,
            // mayShowUserSettingsDialog: true
        }, ( { coords: { latitude, longitude } } ) => setCurrentPosition({ latitude, longitude }) );

        return subscriber.remove; // Remove the watch
    }
    
    useEffect(() => {
        
        getCurrentLocation()
            .then(coords => {
                setInitialPosition({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                });
                setHasLocation( false );
            })

    }, []);

    return {
        initialPosition,
        hasLocation,
        getCurrentLocation,
        followUserLocation,
        currentPosition,
    }
}
