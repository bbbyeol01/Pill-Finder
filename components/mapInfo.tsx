import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Spot from "@/components/spot";
import styles from "@/css/map.module.css";
import { useState, useEffect } from 'react';
import { Pharmacy } from "@/types/pharmacy"
import { Location } from '@/types/location';


export default function MapInfo ({pharmacyList, count} : {pharmacyList : any[], count:number}) {

  useEffect(() => {
    console.log("Updated pharmacy list:", pharmacyList);
  }, [pharmacyList]); // pharmacyList가 변경될 때마다 출력
 
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