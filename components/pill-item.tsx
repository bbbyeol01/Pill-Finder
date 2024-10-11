import { useState, useEffect } from "react";
import styles from "../css/pill-item.module.css"

interface PillItemProps {
    image: any;
    name: string;
    company?: string;
    efficacy?: string;
    method?: string;
}

export const PillItem :React.FC<PillItemProps> = ({image, name, company, efficacy, method}) =>  {

    const [img, setImg] = useState("/images/null-img.jpg");

    useEffect(() => {
        if (image) {
            setImg(image);
        }
    }, [image]);
    
    return (
        <div className={styles["pill-item"]}>
            <img alt={name} src={img}/>
            <div className={styles.name}>
                <div className={styles["name-text"]}>{name}</div>
            </div>
        </div>
    )
}