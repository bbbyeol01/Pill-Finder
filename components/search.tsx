"use client"
import { Pill } from "@/types/pill"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import SearchContainer from "@/components/searchContainer"
import { Pagination } from "@/components/pagination"
import PillContainer from "./pillContainer"
import PillModal from "./pillModal"

const PILL_API_KEY = process.env.NEXT_PUBLIC_PILL_API_KEY;

interface ApiResponse {
    pills: Pill[];
    totalCount: number;
    [key: string]: any;
}


/** open api e약은요 */
async function getData(userInput: string | "", searchType: string | null, pageNo: number, numOfRows: number): Promise<ApiResponse> {

    const url = `https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=${PILL_API_KEY}&type=json&pageNo=${pageNo}&numOfRows=${numOfRows}&${searchType}=${userInput}`;

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

export default function Search(){
    const params = useSearchParams();
    const name = params.get("name") || "";
    const type = params.get("type") || "efcyQesitm";
    const page = params.get("page") || 0
    const [pills, setPills] = useState<Pill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const [currentPage, setCurrentPage] = useState(params.get("page") || 1)
    const [size, setSize] = useState( params.get("size") || 10);
    const [totalItems, setTotalItems] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            // searchContainer 초기화
            setCurrentPage(page)
            setPills([]);
            const fetchedList = await getData(name, type, +currentPage, +size);
            setPills(fetchedList.pills);
            setTotalItems(fetchedList.totalCount)
        };
        fetchData();
    }, [name, type, page]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };



    return (
        <main>
            <SearchContainer/>
   
                    <Suspense fallback={<h5>Loading...</h5>}>
                        <PillContainer totalItems={totalItems} pills={pills}/>
                    </Suspense>

                <Pagination 
                    currentPage={Number(currentPage)}
                    totalItems={totalItems}
                    itemsPerPage={Number(size)}
                    onPageChange={handlePageChange}/>

        </main>

    );
}