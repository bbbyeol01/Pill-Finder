import style from "../css/spinner.module.css";

export default function Spinner() {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.spinner}></div>
      </div>
    </>
  );
}
