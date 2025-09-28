import PeriodCard from "./PeriodCard";
import ChartView from "./ChartView";
import styles from "./CostAnalysis.module.css";

const Main = ({ isOpen, setIsOpen, mode, setMode }) => (
  <main className={styles.pageRow} role="main">
    <PeriodCard
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      mode={mode}
      setMode={setMode}
    />
    <ChartView />
  </main>
);

export default Main;
