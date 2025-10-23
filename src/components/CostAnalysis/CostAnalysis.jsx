import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import styles from "./CostAnalysis.module.css";
import { TransactionContext } from "../../context/TransactionContext";
import { MONTHS } from "./constants";
import { formatDate } from "./utils";

const categoryMap = {
  food: { label: "Еда", color: "#d9b6ff" },
  transport: { label: "Транспорт", color: "#ffb53d" },
  housing: { label: "Жилье", color: "#6ee4fe" },
  joy: { label: "Развлечения", color: "#b0aeff" },
  education: { label: "Образование", color: "#bcec30" },
  others: { label: "Другое", color: "#ffb9b8" },
};

const aggregateTransactions = (transactions, period) => {
  const categorySums = {};
  let total = 0;

  transactions.forEach((tx) => {
    const cat = tx.category;
    const sum = tx.sum;
    if (!categorySums[cat]) {
      categorySums[cat] = 0;
    }
    categorySums[cat] += sum;
    total += sum;
  });

  const categories = Object.keys(categorySums)
    .filter((cat) => categoryMap[cat])
    .map((cat) => ({
      category: cat,
      value: categorySums[cat],
      label: categoryMap[cat].label,
      color: categoryMap[cat].color,
    }));

  const parseDate = (dateStr) => {
    const [month, day, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const startDate = parseDate(period.start);
  const endDate = parseDate(period.end);
  const formatDateStr = (date) => {
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  };
  const dateStr =
    startDate.getTime() === endDate.getTime()
      ? formatDateStr(startDate)
      : `${formatDateStr(startDate)} - ${formatDateStr(endDate)}`;

  return { total, date: dateStr, categories };
};

const CostAnalysis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("month");
  const [period, setPeriod] = useState(null);
  const [expensesData, setExpensesData] = useState(null);
  const { transactions, loading, error, loadTransactionsByPeriod } =
    useContext(TransactionContext);

  useEffect(() => {
    const currentDate = new Date(2025, 9, 6);
    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const end = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    setPeriod({
      start: formatDate(start),
      end: formatDate(end),
    });
  }, []);

  useEffect(() => {
    if (period?.start && period?.end) {
      loadTransactionsByPeriod(period.start, period.end);
    }
  }, [period, loadTransactionsByPeriod]);

  useEffect(() => {
    if (period && transactions !== null) {
      const aggregated = aggregateTransactions(transactions, period);
      setExpensesData(aggregated);
    }
  }, [transactions, period]);

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

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.page}>
      <Header />
      <Main
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={mode}
        setMode={setMode}
        onPeriodChange={handlePeriodChange}
        onConfirm={handleConfirm}
        expensesData={expensesData}
        isLoading={loading}
        error={error}
      />
      <Footer isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={handleConfirm} />
    </div>
  );
};

export default CostAnalysis;
