import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Spot from "@/components/spot";
import styles from "@/css/map.module.css";
import { useState, useEffect } from 'react';
import { Pharmacy } from "@/types/pharmacy"
import { Location } from '@/types/location';

export default function MapInfo({ pharmacyList, count, moveMap, pagination }: { pharmacyList: any[], count: number, moveMap: (location : Location) => void, pagination: any }) {

  useEffect(() => {
    console.log(pagination)
  }, [pagination])

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

                const location : Location = {
                  latitude: pharmacy.y,  // 위도
                  longitude: pharmacy.x   // 경도
                };

                 return <Spot key={pharmacy.id} pharmacy={info}
                 onClick={() => {
                  console.log(location)
                  moveMap(location)
                }} />
              })
            }

            <div className={styles.moreMarker}>
     
            {   

              pagination && pagination.hasNextPage ? 
                (<button className={styles.moreBtn}
                onClick={() => { pagination.nextPage() }}>
                  <img src="/images/icon/more-icon.png"/> 더보기
                </button>)
                : <></>
            }

        
            </div>
          
        </div>

    </>
  );
};