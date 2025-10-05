import PeriodCard from "./PeriodCard";
import ChartView from "./ChartView";
import styles from "./CostAnalysis.module.css";

const Main = ({
  isOpen,
  setIsOpen,
  mode,
  setMode,
  onPeriodChange,
  onConfirm,
  expensesData,
  isLoading,
  error,
}) => (
  <main className={styles.pageRow} role="main">
    <PeriodCard
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      mode={mode}
      setMode={setMode}
      onPeriodChange={onPeriodChange}
      onConfirm={onConfirm}
    />
    <ChartView
      expensesData={expensesData}
      isLoading={isLoading}
      error={error}
    />
  </main>
);

export default Main;
