import styles from "@/css/modal.module.css"

export default function Modal () {
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
                <img className={styles.pillImg} src="/images/null-img.jpg" alt=""/> 
            </div>
            <div className={styles.symptom}>증상</div>
            <div className={styles.method}>복용 방법</div>
            <div className={styles.efficacy}>효능</div>
                <div className={styles.findPharmacy}>
                <button className={styles.goToPage}> 판매처 찾기 </button>
                </div>
            
        </article>
    </section>
    )
}