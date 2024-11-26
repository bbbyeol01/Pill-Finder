import { useState, useEffect } from "react";
import styles from "../css/pill-item.module.css"
import PillModal from "./pillModal";
import { Pill } from "@/types/pill";

export interface PillItemProps {
    image: any;
    name: string;
    handleClick : () => void
}

export const PillItem :React.FC<PillItemProps> = ({image, name, handleClick}) =>  {

    const [img, setImg] = useState("/images/null-img.jpg");


    useEffect(() => {
        if (image) {
            setImg(image);
        }
    }, [image]);

    return (
        <div className={styles["pill-item"]} onClick={handleClick}>
            <img alt={name} src={img}/>
            <div className={styles.name}>
                <div className={styles["name-text"]}>{name}</div>
            </div>

        
        </div>

    )
}