import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import styles from "./CostAnalysis.module.css";

const CostAnalysis = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("month");
  const [selectedPeriod, setSelectedPeriod] = useState({
    start: "07-10-2024",
    end: "07-10-2024",
  });
  const [expensesData, setExpensesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    if (!user?.token) {
      setError("Требуется авторизация");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://wedev-api.sky.pro/api/transactions/period",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            start: selectedPeriod.start,
            end: selectedPeriod.end,
          }),
        }
      );
      if (!response.ok) {
        if (response.status === 401) throw new Error("Неавторизован");
        if (response.status === 400) throw new Error("Неверный формат периода");
        throw new Error("Ошибка загрузки данных");
      }
      const data = await response.json();
      // Агрегация данных по категориям
      const categories = [
        { category: "food", label: "Еда", color: "#d9b6ff" },
        { category: "transport", label: "Транспорт", color: "#ffb53d" },
        { category: "housing", label: "Жилье", color: "#6ee4fe" },
        { category: "joy", label: "Развлечения", color: "#b0aeff" },
        { category: "education", label: "Образование", color: "#bcec30" },
        { category: "others", label: "Прочее", color: "#ffb9b8" },
      ].map((cat) => ({
        ...cat,
        value: data
          .filter((t) => t.category === cat.category)
          .reduce((sum, t) => sum + t.sum, 0),
      }));
      const total = categories.reduce((sum, cat) => sum + cat.value, 0);
      setExpensesData({
        total,
        date: `${selectedPeriod.start} – ${selectedPeriod.end}`,
        categories,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token && selectedPeriod.start && selectedPeriod.end) {
      fetchExpenses();
    }
  }, [selectedPeriod, user]);

  const handleConfirm = () => {
    fetchExpenses();
  };

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
        onPeriodChange={setSelectedPeriod}
        expensesData={expensesData}
        isLoading={isLoading}
        error={error}
      />
      <Footer isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={handleConfirm} />
    </div>
  );
};

export default CostAnalysis;
