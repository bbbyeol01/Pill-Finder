import Link from "next/link"
import styles from "@/css/header.module.css"

export default function Header() {
    
    return (<header className={styles.header}>
            <section className="">
                <Link href={"/"} className={styles.logoContainer}>
                        <img className={styles.logoImg} src="/images/icon/pill-icon.png" alt=""/>
                        <div className={styles.logo}>PILL FINDER </div>
                </Link>

                <div className={styles.menuContainer}>
                    <Link href={"/"} className={styles.pillFinder}>약 찾기</Link>
                    <Link href={"/pharmacy"} className={styles.findMap}>약국 찾기</Link>
                    {/* <Link href={"/login"} className="login">로그인</Link> */}
                    {/* <div className="userInfo"> */}
                        {/* <img className="profile-image" src="/images/unnamed.jpg"/> */}
                        {/* <div className="menu">
                            <div className="mypage">마이페이지</div>
                            <div className="logout">로그아웃</div>
                        </div> */}
                    {/* </div> */}
                </div>
            </section>
            </header>

    )
}