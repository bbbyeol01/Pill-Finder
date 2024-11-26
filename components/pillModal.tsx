import styles from "@/css/modal.module.css"
import { Suspense, useState } from "react"
import { Pill } from "@/types/pill";
import { symptomList } from "@/data/symptomList";

interface PillModalProps {
    pill : Pill | null,
    onClose: () => void;
}

export default function PillModal ({pill, onClose} : PillModalProps) {

    return (
        <>
            <section className={styles.modal} onClick={onClose}>
                <article className={styles.infoContainer} onClick={(e) => {e.stopPropagation()}}>
                    <div className={styles.nameContainer} >
                        <div className={styles.company}>{pill?.company}</div>
                        <div className={styles.name}>{pill?.name}</div>
                    </div>

                    <div className={styles.imageContainer}>
                        <div className={styles.bookmark}> 
                        <img className="bookmark-img" src="/images/icon/star.png" alt=""/>
                        </div>
                        <Suspense fallback={<img src="/images/null-img.jpg"/>}>
                            <img className={styles.pillImg} src={pill?.image ? pill.image : "/images/null-img.jpg"} alt=""/> 
                        </Suspense>
                    </div>
                    <div className={styles.symptomContainer}>
                    {
                        symptomList.map((item) => {
                            return (
                                pill?.efficacy.includes(item) ? 
                                <div className={styles.symptom}>{item}</div>
                                :""
                            )
                        })
                    }
                    </div>
                   
                    <div className={styles.efficacy}>{pill?.efficacy}</div>
                    <div className={styles.method}>{pill?.method}</div>
                    {/* <div className={styles.findPharmacy}>
                        <button className={styles.goToPage}> 판매처 찾기 </button>
                        </div> */}
                    
                </article>
            </section>
        </>
    )
}