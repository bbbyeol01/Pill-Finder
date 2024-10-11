"use client"

import { useEffect, useState, useRef } from "react";
import styles from "@/css/map.module.css";
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MapInfo from "@/components/mapInfo";

export default function Pharmacy() {
  const [myLocation, setMyLocation] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });
  const [isLocationFetched, setIsLocationFetched] = useState(false); // 위치 정보를 가져왔는지 여부

  const mapRef = useRef(null)

  function getMyLocation () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setMyLocation({ latitude, longitude });
        setIsLocationFetched(true)
      });
    }
  }

  useEffect(() => {
    getMyLocation();
  }, []);

  /** 내 위치가 변경되면 지도 중앙 변경 */
  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current; // Kakao Map 객체를 참조
      mapInstance.panTo(new window.kakao.maps.LatLng(myLocation.latitude, myLocation.longitude));
    }
  }, [myLocation]);

  return (
    <main className={styles.main}>

      <section className={styles.mapContainer}>
        <div className={styles.mapWrapper}>

          <Map center={{ lat: myLocation.latitude, lng:myLocation.longitude}} 
          className={styles.map} 
          ref={mapRef}>
            <MapMarker position={{lat: myLocation.latitude, lng:myLocation.longitude}}/>
          </Map>

          <div className={styles.goToMyLocation}
          onClick={getMyLocation}>
            <img src="/images/icon/target-icon.png" alt="" />
          </div>

          {
            isLocationFetched ? <MapInfo location={myLocation}/> : <></>
          }
          
    
        </div>
      </section>
      
    </main>
  );
}