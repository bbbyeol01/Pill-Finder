import React from 'react';
import styles from "../css/pageContainer.module.css"
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const numOfPage = 5; // 한 번에 표시할 페이지 수
  const startPage = Math.floor((currentPage - 1) / numOfPage) * numOfPage + 1;
  const endPage = Math.min(startPage + numOfPage - 1, totalPages);

  const params = useSearchParams();
  const router = useRouter();

  const handlePageClick = (page: number) => {

    // 이전 url
    const currentParams = new URLSearchParams(params.toString());

    // page만 변경
    try{
      currentParams.set("page", page.toString())
      router.push(`/search?${currentParams.toString()}`)
    }catch(error){
      console.error(error)
    }

  };

  return (
    <section className={styles["pageContainer"]}>
      <button
        className={styles.prevBtn}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        &larr;
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={styles.nextBtn}
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        &rarr;
      </button>
    </section>
  );
};
