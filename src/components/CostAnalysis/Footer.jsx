import styles from "./CostAnalysis.module.css";

const Footer = ({ isOpen, setIsOpen }) => (
  <footer className={styles.periodFooter}>
    <button
      id="open-period-btn"
      className={styles.periodAction}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={styles.periodActionText}>
        {isOpen ? "Выбрать период" : "Выбрать другой период"}
      </span>
    </button>
  </footer>
);

export default Footer;
