"use client";
import { Pill } from "@/types/pill";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import SearchContainer from "@/components/searchContainer";
import { Pagination } from "@/components/pagination";
import PillContainer from "./pillContainer";
import PillModal from "./pillModal";
import { useRouter } from "next/router";

const PILL_API_KEY = process.env.NEXT_PUBLIC_PILL_API_KEY;

interface ApiResponse {
  pills: Pill[];
  totalCount: number;
  [key: string]: any;
}

/** open api e약은요 */
async function getData(
  userInput: string | "",
  searchType: string | null,
  pageNo: number,
  numOfRows: number
): Promise<ApiResponse> {
  const url = `https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=${PILL_API_KEY}&type=json&pageNo=${pageNo}&numOfRows=${numOfRows}&${searchType}=${userInput}`;

  const pills: Pill[] = [];

  let totalCount;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const body = data.body;
    totalCount = body.totalCount;

    if (body.items && body.items.length !== 0) {
      body.items.forEach(
        (pill: {
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
            efficacy: pill.efcyQesitm
              ? pill.efcyQesitm.replaceAll(".", ". ")
              : "",
            method: pill.useMethodQesitm
              ? pill.useMethodQesitm.replaceAll(".", ". ")
              : "",
            image: pill.itemImage || "",
            date: pill.openDe,
            code: pill.bizrno,
          });
        }
      );

      pills.sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch (error) {
    console.log("검색 결과가 없습니다.");
    console.error(error);
  }

  return { pills, totalCount };
}

export default function Search() {
  const params = useSearchParams();
  const [name, setName] = useState(params.get("name") || "");
  const [type, setType] = useState(params.get("type") || "efcyQesitm");
  const page = params.get("page") || 0;
  const [pills, setPills] = useState<Pill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [size, setSize] = useState(params.get("size") || 10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newName = params.get("name") || "";
    const newType = params.get("type") || "efcyQesitm";

    setName(newName);
    setType(newType);
  }, [params]); // params가 바뀌면 실행

  const fetchData = async (type: string, name: string) => {
    setIsLoading(true);
    // searchContainer 초기화
    setCurrentPage(page);
    setPills([]);
    const fetchedList = await getData(name, type, +currentPage, +size);
    setPills(fetchedList.pills);
    setTotalItems(fetchedList.totalCount);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(type, name);
  }, [name, type, page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (newType: string, newName: string) => {
    setType(newType);
    setName(newName);
    fetchData(newType, name);
  };

  return (
    <main>
      <SearchContainer />

      {/* <Suspense fallback={<h5>Loading...</h5>}> */}
      <PillContainer
        userInput={name}
        searchType={type}
        totalItems={totalItems}
        pills={pills}
        isLoading={isLoading}
        onChange={handleChange}
      />
      {/* </Suspense> */}

      <Pagination
        currentPage={Number(currentPage)}
        totalItems={totalItems}
        itemsPerPage={Number(size)}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
