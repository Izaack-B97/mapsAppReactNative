import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Locations } from '../interfaces/appInterfaces';

export const useLocation = () => {
    
    const [ hasLocation, setHasLocation ] = useState( true );
    const [ initialPosition, setInitialPosition ] = useState<Locations>({ latitude: 0, longitude: 0 });
    const [ currentPosition, setCurrentPosition ] = useState<Locations>({ latitude: 0, longitude: 0 });
    const [ routeLines, setRouteLines ] = useState<Locations[]>([]);

    const getCurrentLocation  = async () => {
        const resp = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
        const { coords } = resp;
        return coords;
    };

    const followUserLocation = async () => {
        const subscriber = await Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
            // mayShowUserSettingsDialog: true
        }, 
        ( { coords: { latitude, longitude } } ) => {
            const location : Locations = {
                latitude,
                longitude
            }
        
            setCurrentPosition( location );
            setRouteLines( routes => [ ...routes, location ] );
            
            // console.log( routeLines )
            
        });

        return subscriber.remove; // Remove the watch
    }

    useEffect(() => {       
        getCurrentLocation()
            .then(({ latitude, longitude }) => {
                const location : Locations = {
                    latitude,
                    longitude
                }

                setInitialPosition( location );
                setRouteLines( routes => [ ...routes, location ] );
                setHasLocation( false );
            })

    }, []);

    return {
        initialPosition,
        hasLocation,
        getCurrentLocation,
        followUserLocation,
        currentPosition,
        routeLines
    }
}
