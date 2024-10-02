"use client"

import styles from "@/css/search.module.css"
import { useSearchParams } from "next/navigation"
import { PillItem } from "@/components/pill-item"
import { useState, useEffect, Suspense } from "react"
import SearchContainer from "@/components/searchContainer"
import { Pagination } from "@/components/pagination"

const PILL_API_KEY = process.env.NEXT_PUBLIC_PILL_API_KEY;

interface ApiResponse {
    pills: Pill[];
    totalCount: number;
    [key: string]: any;
}

interface Pill {
    name: string;
    company: string;
    efficacy: string;
    method: string;
    image: string;
    date: string;
    code: string;
}

/** open api e약은요 */
async function getData(userInput: string | "", searchType: string | null, pageNo: number, numOfRows: number): Promise<ApiResponse> {

    const url = `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=${PILL_API_KEY}&type=json&pageNo=${pageNo}&numOfRows=${numOfRows}&${searchType}=${userInput}`;

    const pills: Pill[] = [];

    let totalCount;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const body = data.body;
        totalCount = body.totalCount;

        if (body.items && body.items.length !== 0) {
            body.items.forEach((pill: { 
                itemName: string; 
                entpName: string; 
                efcyQesitm: string; 
                useMethodQesitm: string; 
                itemImage: string; 
                openDe: string; 
                bizrno: string; 
            }) => {
                pills.push({
                    name: pill.itemName,
                    company: pill.entpName,
                    efficacy: pill.efcyQesitm ? pill.efcyQesitm.replaceAll(".", ". ") : "",
                    method: pill.useMethodQesitm ? pill.useMethodQesitm.replaceAll(".", ". ") : "",
                    image: pill.itemImage || "",
                    date: pill.openDe,
                    code: pill.bizrno,
                });

            });

            pills.sort((a, b) => a.name.localeCompare(b.name));
        }
    } catch (error) {
        console.log("검색 결과가 없습니다.")
        console.error(error)
    }

    return { pills, totalCount };
}


export default function Search() {
    const params = useSearchParams();
    const name = params.get("name") || "";
    const type = params.get("type") || "efcyQesitm";
    const [pills, setPills] = useState<Pill[]>([]);

    const [currentPage, setCurrentPage] = useState(params.get("page") || 1)
    const [size, setSize] = useState( params.get("size") || 10);
    const [totalItems, setTotalItems] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            // searchContainer 초기화
            setPills([]);
            const fetchedList = await getData(name, type, +currentPage, +size);
            setPills(fetchedList.pills);
            setTotalItems(fetchedList.totalCount)
        };
        fetchData();
    }, [name, type]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

    return (
        <main>
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

            <SearchContainer/>

            <Suspense fallback={<h1>Loading...</h1>}>
                <section className={styles.pillContainer}>
                    {
                        pills.length === 0 ? (
                            <div className={styles.noSearch}>
                                <p>검색 결과가 없습니다.</p>
                            </div>
                        ) :
                        
                        (
                            <>
                            <div className={styles.count}>
                                <strong>{totalItems}</strong>개의 검색 결과가 있습니다.
                            </div> 
                            <div className={styles["pill-list"]}>
                                { pills.map((pill) => (
                                        <PillItem 
                                            key={pill.code}
                                            image={pill.image}
                                            name={pill.name}
                                            company={pill.company}
                                            efficacy={pill.efficacy}
                                            method={pill.method}
                                        />
                                ))}
                            </div>
                            </>
                        )
                    }   
                </section>
            </Suspense>

            <Pagination 
                currentPage={+currentPage}
                totalItems={totalItems}
                itemsPerPage={+size}
                onPageChange={handlePageChange}/>
        </main>
    );
}