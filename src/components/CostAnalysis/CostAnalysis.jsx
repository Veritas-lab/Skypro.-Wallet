import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import styles from "./CostAnalysis.module.css";
import { TransactionContext } from "../../context/TransactionContext";

const CostAnalysis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("month");
  const { loadTransactions } = useContext(TransactionContext);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 376 && isOpen) {
        setIsOpen(false);
        document.body.style.overflow = "";
        document.body.classList.remove(styles.overlayActive);
      }
    };

    const handleKeydown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        document.body.style.overflow = "";
        document.body.classList.remove(styles.overlayActive);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.overlayActive);
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove(styles.overlayActive);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className={styles.page}>
      <Header />
      <Main
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={mode}
        setMode={setMode}
      />
      <Footer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CostAnalysis;
