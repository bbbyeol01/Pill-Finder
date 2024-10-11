import styles from "@/css/spot.module.css"
import { Pharmacy } from "@/types/pharmacy"

export default function Spot({pharmacy} : {pharmacy : Pharmacy}) {

    return (
        <>
            <div className={styles.spot}>
                <div className={styles.spotInfo}>
                    <div className={styles.nameContainer}>
                        <div className={styles.name}>{pharmacy.name}</div>
                        <div className={styles.distance}>{pharmacy.distance}</div>
                    </div>
                    <div className={styles.addr}>{pharmacy.addr}</div>
                    <div className="tel">{pharmacy.phone}</div>
                </div>

                <div className={styles.goToSpot}>
                    <img src="/images/icon/navigation-icon.png" className={styles.spotNavigate}/>
                </div>
            </div>
        </>
    )
}