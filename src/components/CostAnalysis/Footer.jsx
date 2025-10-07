import styles from "./CostAnalysis.module.css";

const Footer = ({ isOpen, setIsOpen, onConfirm }) => (
  <footer className={styles.periodFooter}>
    {isOpen ? (
      <button
        id="confirm-period-btn"
        className={styles.periodAction}
        onClick={() => {
          setIsOpen(false);
          onConfirm();
        }}
      >
        <span className={styles.periodActionText}>Подтвердить</span>
      </button>
    ) : (
      <button
        id="open-period-btn"
        className={styles.periodAction}
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.periodActionText}>Выбрать другой период</span>
      </button>
    )}
  </footer>
);

export default Footer;
