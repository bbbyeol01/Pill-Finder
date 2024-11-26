import styles from "@/css/search.module.css"
import { PillItem } from "@/components/pill-item"
import { useState } from "react"
import PillModal from "./pillModal"
import { Pill } from "@/types/pill"


export default function PillContainer ({totalItems, pills} : {totalItems : number, pills:Pill[]}) {

    const [selectedPill, setSelectedPill] = useState<Pill | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);


    function handleClick(pill : Pill){
        setSelectedPill(pill);
        setShowModal(true);
    }

    function handleClose(){
        setSelectedPill(null);
        setShowModal(false);
    }

    return (
        <>
        { showModal &&  <PillModal onClose={handleClose} pill={selectedPill}/> }
        <section className={styles.pillContainer}>
        <div className={styles.count}>
                <strong>{totalItems}</strong>개의 검색 결과가 있습니다.
            </div> 
            <div className={styles["pill-list"]}>
                { pills.map((pill, index) => (
                        <PillItem 
                            key={`${pill.code}-${index}`}
                            image={pill.image}
                            name={pill.name}
                            handleClick={() => { handleClick(pill) }}
                        />
                ))}
            </div>
           
        </section>
        </>

            )

}