import styles from "./CostAnalysis.module.css";

const ChartView = () => (
  <section
    className={styles.chartCard}
    aria-labelledby="chart-title"
    role="region"
  >
    <div className={styles.chartHeader}>
      <div className={styles.chartTotal}>
        <div className={styles.totalValue}>9 581 ₽</div>
        <div className={styles.totalSub}>
          <span className={styles.labelMuted}>Расходы за</span>
          <span className={styles.labelStrong}>10 июля 2024</span>
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
        {[
          {
            category: "food",
            value: "3 590 ₽",
            height: "328px",
            color: "#d9b6ff",
            label: "Еда",
          },
          {
            category: "transport",
            value: "1 835 ₽",
            height: "169px",
            color: "#ffb53d",
            label: "Транспорт",
          },
          {
            category: "housing",
            value: "0 ₽",
            height: "4px",
            color: "#6ee4fe",
            label: "Жильё",
            minimal: true,
          },
          {
            category: "entertainment",
            value: "1 250 ₽",
            height: "109px",
            color: "#b0aeff",
            label: "Развлечения",
          },
          {
            category: "education",
            value: "600 ₽",
            height: "65px",
            color: "#bcec30",
            label: "Образование",
          },
          {
            category: "other",
            value: "2 306 ₽",
            height: "212px",
            color: "#ffb9b8",
            label: "Другое",
          },
        ].map((item) => (
          <div
            key={item.category}
            className={`${styles.barColumn} ${
              styles[`barColumn--${item.category}`]
            }`}
          >
            <div className={styles.barValue}>{item.value}</div>
            <div
              className={`${styles.bar} ${
                item.minimal ? styles.barMinimal : ""
              }`}
              data-amount={item.value}
              style={{ height: item.height, background: item.color }}
            ></div>
            <div className={styles.barLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ChartView;
