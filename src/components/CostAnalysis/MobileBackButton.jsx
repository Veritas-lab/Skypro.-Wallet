import styles from "./CostAnalysis.module.css";

const MobileBackButton = ({ onClick }) => (
  <button
    id="back-analysis"
    className={styles.mobileBack}
    type="button"
    aria-hidden="true"
    onClick={onClick}
  >
    <svg
      className={styles.mobileBackIcon}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.44413 1.16675H4.55579C2.43246 1.16675 1.16663 2.43258 1.16663 4.55591V9.43841C1.16663 11.5676 2.43246 12.8334 4.55579 12.8334H9.43829C11.5616 12.8334 12.8275 11.5676 12.8275 9.44425V4.55591C12.8333 2.43258 11.5675 1.16675 9.44413 1.16675ZM10.5 7.43758H4.55579L6.31163 9.19341C6.48079 9.36258 6.48079 9.64258 6.31163 9.81175C6.22413 9.89925 6.11329 9.94008 6.00246 9.94008C5.89163 9.94008 5.78079 9.89925 5.69329 9.81175L3.19079 7.30925C3.10913 7.22758 3.06246 7.11675 3.06246 7.00008C3.06246 6.88341 3.10913 6.77258 3.19079 6.69091L5.69329 4.18841C5.86246 4.01925 6.14246 4.01925 6.31163 4.18841C6.48079 4.35758 6.48079 4.63758 6.31163 4.80675L4.55579 6.56258H10.5C10.7391 6.56258 10.9375 6.76091 10.9375 7.00008C10.9375 7.23925 10.7391 7.43758 10.5 7.43758Z"
        fill="#999999"
      />
    </svg>
    <span className={styles.mobileBackText}>Анализ расходов</span>
  </button>
);

export default MobileBackButton;
