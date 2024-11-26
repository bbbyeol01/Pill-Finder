import styles from "@/css/modal.module.css"
import { Suspense } from "react"
import { Pill } from "@/types/pill";
import { Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

interface PillModalProps {
    pill : Pill | null,
    show : boolean
    handleClick : () => void;
}

export default function PillModal (props : PillModalProps) {

    return (
        <>
            <Modal show={props.show} style={{margin : "100px 0"}}>
                <Modal.Header closeButton>
                    <div className={styles.nameContainer}>
                        <div className={styles.company}>제약</div>
                        <div className={styles.name}>약 이름</div>
                    </div>
                </Modal.Header>
                <Modal.Body>

                <article className={styles.infoContainer}>
                  

                    <div className={styles.image}>
                        <div className={styles.bookmark}> 
                        <img className="bookmark-img" src="/images/star.png" alt=""/>
                        </div>
                        <Suspense fallback={<img src="/images/null-img.jpg"/>}>
                            <img className={styles.pillImg} src={props.pill?.image} alt=""/> 
                        </Suspense>
                    </div>
                    <div className={styles.symptom}>증상</div>
                    <div className={styles.method}>복용 방법{props.pill?.method}</div>
                    <div className={styles.efficacy}>효능{props.pill?.efficacy}</div>
                    <div className={styles.findPharmacy}>
                        <button className={styles.goToPage}> 판매처 찾기 </button>
                        </div>
                    
                </article>
                </Modal.Body>
            </Modal>
        </>
    )
}