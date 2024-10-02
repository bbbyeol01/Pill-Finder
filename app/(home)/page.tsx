import SearchContainer from "../../components/searchContainer"
import styles from "../../css/home.module.css"

export default function Home() {

  return (
    <main>
          <section className={styles.iconContainer}>
              <img className={styles.pillImg} src="/images/pill-3d-icon.png" alt=""/>
          </section>

          <SearchContainer/>

      </main>
      )
}
