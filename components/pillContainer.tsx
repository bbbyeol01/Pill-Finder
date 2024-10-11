import styles from "@/css/search.module.css"
import { PillItem } from "@/components/pill-item"
import Modal from "@/components/modal"



export default function PillContainer ({totalItems, pills} : {totalItems : number, pills:any[]}) {

    return (
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
                            company={pill.company}
                            efficacy={pill.efficacy}
                            method={pill.method}
                            onClick={() => {
                                <Modal pillItem={pill}/>
                            }}
                        />
                ))}
            </div>



    </section>
            )

}