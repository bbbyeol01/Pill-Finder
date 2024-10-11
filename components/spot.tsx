import styles from "@/css/spot.module.css"
import { Pharmacy } from "@/types/pharmacy"

export default function Spot({ pharmacy, onClick }: { pharmacy: Pharmacy; onClick: () => void }) {
    
    return (
        <>
            <div className={styles.spot}>
                <div className={styles.spotInfo} onClick={onClick}>
                    <div className={styles.nameContainer}>
                        <div className={styles.name}>{pharmacy.name}</div>
                        <div className={styles.distance}>{pharmacy.distance}</div>
                    </div>
                    <div className={styles.addr}>{pharmacy.addr}</div>
                    <div className="tel">{pharmacy.phone}</div>
                </div>

                <a className={styles.goToSpot} href={pharmacy.link} target="_blank">
                    <img src="/images/icon/navigation-icon.png" className={styles.spotNavigate}/>
                </a>
            </div>
        </>
    )
}