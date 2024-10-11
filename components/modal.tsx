import styles from "@/css/modal.module.css"
import { Suspense } from "react"
import { PillItemProps } from "@/types/pillItem"

export default function Modal ({pillItem} : {pillItem: PillItemProps}) {
    return (
        <section className={styles.modal}>
        <article className={styles.infoContainer}>
            <div className={styles.nameContainer}>
                <div className={styles.company}>제약</div>
                <div className={styles.name}>약 이름</div>
            </div>

            <div className={styles.image}>
                <div className={styles.bookmark}> 
                <img className="bookmark-img" src="/images/star.png" alt=""/>
                </div>
                <Suspense fallback={<img src="/images/null-img.jpg"/>}>
                    <img className={styles.pillImg} src={pillItem.image} alt=""/> 
                </Suspense>
            </div>
            <div className={styles.symptom}>증상</div>
            <div className={styles.method}>복용 방법{pillItem.method}</div>
            <div className={styles.efficacy}>효능{pillItem.efficacy}</div>
                <div className={styles.findPharmacy}>
                <button className={styles.goToPage}> 판매처 찾기 </button>
                </div>
            
        </article>
    </section>
    )
}