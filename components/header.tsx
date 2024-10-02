import Link from "next/link"

export default function Header() {
    
    return (<header>
            <section className="">
                <Link href={"/"} className="logoContainer">
                        <img className="logoImg" src="/images/icon/pill-icon.png" alt=""/>
                        <div className="logo">PILL FINDER </div>

                </Link>

                <div className="menuContainer">
                    <Link href={"/"} className="pillFinder">약 찾기</Link>
                    <Link href={"/pharmacy"} className="findMap">약국 찾기</Link>
                    <Link href={"/login"} className="login">로그인</Link>
                    <div className="userInfo">
                        <img className="profile-image" src="/images/unnamed.jpg"/>
                        <div className="menu">
                            <div className="mypage">마이페이지</div>
                            <div className="logout">로그아웃</div>
                        </div>
                    </div>
                </div>
            </section>
            </header>

    )
}