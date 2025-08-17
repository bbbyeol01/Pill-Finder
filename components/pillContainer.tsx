import styles from "@/css/search.module.css";
import { PillItem } from "@/components/pill-item";
import { useState } from "react";
import PillModal from "./pillModal";
import { Pill } from "@/types/pill";
import Spinner from "./spinner";

export default function PillContainer({
  userInput,
  searchType,
  totalItems,
  pills,
  isLoading,
  onChange,
}: {
  userInput: string;
  searchType: string;
  totalItems: number;
  pills: Pill[];
  isLoading: boolean;
  onChange: (newType: string, newName: string) => void;
}) {
  const [selectedPill, setSelectedPill] = useState<Pill | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleClick(pill: Pill) {
    setSelectedPill(pill);
    setShowModal(true);
  }

  function handleClose() {
    setSelectedPill(null);
    setShowModal(false);
  }

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (!totalItems) {
    return (
      <>
        <div
          style={{
            height: "20vh",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          <div className={styles.count}>
            <strong>'{userInput}'</strong>
            <br />
            검색 결과가 없습니다.
          </div>
        </div>

        <button
          onClick={() =>
            onChange(
              searchType === "efcyQesitm" ? "itemName" : "efcyQesitm",
              userInput
            )
          }
          style={{ padding: "20px 40px", border: "none", borderRadius: 999 }}
        >
          {searchType === "efcyQesitm" ? "이름" : "증상"}으로 검색하시겠어요?
        </button>
      </>
    );
  }

  return (
    <>
      {showModal && <PillModal onClose={handleClose} pill={selectedPill} />}
      <section className={styles.pillContainer}>
        <div className={styles.count}>
          <strong>{totalItems}</strong>개의 검색 결과가 있습니다.
        </div>
        <div className={styles["pill-list"]}>
          {pills.map((pill, index) => (
            <PillItem
              key={`${pill.code}-${index}`}
              image={pill.image}
              name={pill.name}
              handleClick={() => {
                handleClick(pill);
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
