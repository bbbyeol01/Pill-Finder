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
  const [pharmacyList, setPharmacyList] = useState<any[]>([])
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    // Kakao Maps API 로드 후 실행될 코드
      if (window.kakao && window.kakao.maps) {
        kakao.maps.load(() => {
          if(!isLocationFetched){
            return;
          }

          // 검색 객체
          const ps = new kakao.maps.services.Places();

          ps.keywordSearch("약국", (data, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
              console.log(data.length)
              setCount(data.length)
              setPharmacyList(data)
            }
          }, {
              location: new kakao.maps.LatLng(
                myLocation.latitude,
                myLocation.longitude
              ), // 중심 위치
              radius: 1 * 1000, // 반경 1km
              sort: "distance",
          });
        });
      }
  }, [myLocation]);


  /** 내 위치가 변경되면 지도 중앙 변경 */
  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current; // Kakao Map 객체를 참조
      mapInstance.panTo(new window.kakao.maps.LatLng(myLocation.latitude, myLocation.longitude));
    }
  }, [myLocation]);

    // 커스텀 마커 이미지 설정
    const myLocationMarker = {
      src: "/images/marker/marker-red.png",
      size: {
        width: 30, // 이미지 너비
        height: 30, // 이미지 높이
      },
      options: {
        alt: "My Location",
        cursor: "pointer",
      },
    };

    const customMarker = {
      src: "/images/marker/marker-blue.png",
      size: {
        width: 30, // 이미지 너비
        height: 30, // 이미지 높이
      },
      options: {
        alt: "pharmacy",
        cursor: "pointer",
      },
    };


  return (
    <main className={styles.main}>

      <section className={styles.mapContainer}>
        <div className={styles.mapWrapper}>

          <Map center={{ lat: myLocation.latitude, lng:myLocation.longitude}} 
          className={styles.map} 
          ref={mapRef}>
            
            <MapMarker position={{lat: myLocation.latitude, lng:myLocation.longitude}}
            image={myLocationMarker}/>

            {
               pharmacyList.map((pharmacy) => {
                 return <MapMarker key={pharmacy.id} position={{lat : pharmacy.y, lng:pharmacy.x}}
                 image={customMarker}/>
              })
            }

          </Map>

          <div className={styles.goToMyLocation}
          onClick={getMyLocation}>
            <img src="/images/icon/target-icon.png" alt="" />
          </div>

          {
            isLocationFetched ? <MapInfo count={count} pharmacyList={pharmacyList}/> : <></>
          }
          
    
        </div>
      </section>
      
    </main>
  );
}