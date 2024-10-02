import styles from "../css/pill-item.module.css"

interface PillItemProps {
    image: any;
    name: string;
    company?: string;
    efficacy?: string;
    method?: string;
}

export const PillItem :React.FC<PillItemProps> = ({image, name, company, efficacy, method}) =>  {

    return (
        <div className={styles["pill-item"]}>
            <img alt={name} src={image ? image : "/images/null-img.jpg"}/>
            <div className={styles.name}>
                <div className={styles["name-text"]}>{name}</div>
            </div>
        </div>
    )
}