import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Platform } from "react-native";
import { Locations } from '../interfaces/appInterfaces';

export const useLocation = () => {
    
    const [ hasLocation, setHasLocation ] = useState( true );
    const [ initialPosition, setInitialPosition ] = useState<Locations>({ latitude: 0, longitude: 0 });
    
    const getCurrentLocation  = async () => {
        const resp = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
        const { coords } = resp;
        return coords;
    };

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
        getCurrentLocation
    }
}
