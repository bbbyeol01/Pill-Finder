"use client";

import styles from "../css/searchContainer.module.css";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchContainer() {
  const router = useRouter();

  const params = useSearchParams();

  const [name, setName] = useState(params.get("name"));
  const [type, setType] = useState(params.get("type") || "itemName");
  const [page, setPage] = useState("1");
  const [size, setSize] = useState("10");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?name=${name}&type=${type}&page=${page}&size=${size}`);
  };

  useEffect(() => {
    router.push(`/search?name=${name}&type=${type}&page=${page}&size=${size}`);
  }, [type]);

  return (
    <section className={styles.searchContainer}>
      <div className={styles.search}>
        <form
          method="get"
          onSubmit={handleSubmit}
          className={styles.searchForm}
        >
          <select
            value={type || "itemName"}
            className={styles.searchOption}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setType(e.target.value)
            }
          >
            <option selected={type === "itemName"} value="itemName">
              이름
            </option>
            <option selected={type === "efcyQesitm"} value="efcyQesitm">
              증상
            </option>
          </select>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="약 이름을 검색하세요"
            value={name || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <button type="submit" className={styles.searchBtn}>
            <img src="/images/icon/search-icon.png" />
          </button>
        </form>
      </div>
    </section>
  );
}
