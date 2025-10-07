import styles from "./CostAnalysis.module.css";

const ChartView = ({ expensesData, isLoading, error }) => {
  const calculateHeight = (value, maxValue) => {
    const maxHeight = 328;
    return value === 0
      ? "4px"
      : `${Math.max(4, (value / maxValue) * maxHeight)}px`;
  };

  if (isLoading) {
    return <div className={styles.chartCard}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.chartCard}>Ошибка: {error}</div>;
  }

  if (!expensesData) {
    return <div className={styles.chartCard}>Выберите период</div>;
  }

  const maxValue = Math.max(
    ...expensesData.categories.map((item) => item.value),
    1
  );

  return (
    <section
      className={styles.chartCard}
      aria-labelledby="chart-title"
      role="region"
    >
      <div className={styles.chartHeader}>
        <div className={styles.chartTotal}>
          <div className={styles.totalValue}>{expensesData.total} ₽</div>
          <div className={styles.totalSub}>
            <span className={styles.labelMuted}>Расходы за</span>
            <span className={styles.labelStrong}>{expensesData.date}</span>
          </div>
        </div>
        <div className={styles.chartActions} aria-hidden="true"></div>
      </div>
      <div
        className={styles.chartBody}
        role="group"
        aria-label="График расходов по категориям"
      >
        <div className={styles.barsRow}>
          {expensesData.categories.map((item) => (
            <div
              key={item.category}
              className={`${styles.barColumn} ${
                styles[`barColumn--${item.category}`]
              }`}
            >
              <div className={styles.barValue}>{item.value} ₽</div>
              <div
                className={`${styles.bar} ${
                  item.value === 0 ? styles.barMinimal : ""
                }`}
                data-amount={item.value}
                style={{
                  height: calculateHeight(item.value, maxValue),
                  background: item.color,
                }}
              ></div>
              <div className={styles.barLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChartView;
