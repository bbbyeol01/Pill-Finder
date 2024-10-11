import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Spot from "@/components/spot";
import styles from "@/css/map.module.css";
import { useState, useEffect } from 'react';
import { Pharmacy } from "@/types/pharmacy"
import { Location } from '@/types/location';


export default function MapInfo ({location} : {location : Location}) {
  const [pharmacyList, setPharmacyList] = useState<any[]>([])
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Updated pharmacy list:", pharmacyList);
  }, [pharmacyList]); // pharmacyList가 변경될 때마다 출력

  useEffect(() => {
    // Kakao Maps API 로드 후 실행될 코드
      if (window.kakao && window.kakao.maps) {
        kakao.maps.load(() => {

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
                location.latitude,
                location.longitude
              ), // 중심 위치
              radius: 1 * 1000, // 반경 1km
              sort: "distance",
          });
        });
      }
  }, [location]);

  return (

    <>
        <div className={styles.mapInfo}>
            <div className={styles.count}><strong>{count}</strong>개의 검색 결과가 있습니다.</div>
            {
              pharmacyList.map((pharmacy) => {
                const info: Pharmacy = {
                    name: pharmacy.place_name,
                    addr : pharmacy.road_address_name,
                    phone : pharmacy.phone,
                    link : pharmacy.place_url,
                    distance : pharmacy.distance < 1000
                            ? pharmacy.distance + "m"
                            : (pharmacy.distance / 1000).toFixed(2) + "km"
                }
                 return <Spot key={pharmacy.id} pharmacy={info}/>
              })
            }

        </div>

    </>
  );
};