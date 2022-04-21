import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from 'react';

mapboxgl.accessToken = process.env.REACT_APP_MBTOKEN;


export default function Map({latGeo, lngGeo}) {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [lng, setLng] = useState(lngGeo);
    const [lat, setLat] = useState(latGeo);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        console.log('renered map');
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],      
        zoom: zoom
        });
        // Create a default Marker and add it to the map.
        marker.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    });
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));
        });
    });
    
    return (
        <div>
            {/* {lngGeo} {latGeo}<br/>
            {lng} {lat}
          <div className="sidebar">
            Longitude: {lngGeo} | Latitude: {latGeo} | Zoom: {zoom}
          </div> */}
          <div ref={mapContainer} className="map-container" />
        </div>
    );
}