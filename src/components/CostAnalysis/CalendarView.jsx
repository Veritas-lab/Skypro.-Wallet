import { useState } from "react";
import styles from "./CostAnalysis.module.css";
import { MONTHS, WEEKDAYS } from "./constants";

const CalendarView = ({ mode, setMode }) => {
  const [dayRange, setDayRange] = useState({
    start: { month: "jul-2024", day: 10 },
    end: { month: "jul-2024", day: 10 },
  });
  const [monthRange, setMonthRange] = useState({
    start: { year: 2024, month: "Июль" },
    end: { year: 2024, month: "Июль" },
  });
  const [isSelecting, setIsSelecting] = useState(false);

  const monthMap = {
    "jul-2024": "2024-07",
    "aug-2024": "2024-08",
  };

  const handleMouseDown = (type, value) => {
    setIsSelecting(true);
    if (type === "day") {
      setDayRange({ start: value, end: value });
    } else {
      setMonthRange({ start: value, end: value });
    }
  };

  const handleMouseOver = (type, value) => {
    if (isSelecting) {
      if (type === "day") {
        setDayRange((prev) => ({ ...prev, end: value }));
      } else {
        setMonthRange((prev) => ({ ...prev, end: value }));
      }
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const handleClick = (type, value) => {
    if (type === "day") {
      setDayRange({ start: value, end: value });
    } else {
      setMonthRange({ start: value, end: value });
    }
  };

  const isInRange = (type, value) => {
    let start, end, current;
    if (type === "day") {
      const range = dayRange;
      if (!range.start || !range.end) return false;
      start = new Date(
        `${monthMap[range.start.month]}-${range.start.day
          .toString()
          .padStart(2, "0")}`
      );
      end = new Date(
        `${monthMap[range.end.month]}-${range.end.day
          .toString()
          .padStart(2, "0")}`
      );
      current = new Date(
        `${monthMap[value.month]}-${value.day.toString().padStart(2, "0")}`
      );
    } else {
      const range = monthRange;
      if (!range.start || !range.end) return false;
      start = MONTHS.indexOf(range.start.month) + range.start.year * 12;
      end = MONTHS.indexOf(range.end.month) + range.end.year * 12;
      current = MONTHS.indexOf(value.month) + value.year * 12;
    }
    return current >= Math.min(start, end) && current <= Math.max(start, end);
  };

  return (
    <>
      <div className={styles.headerRow}>
        <h2 className={`${styles.periodTitle} ${styles.titleDesktop}`}>
          Период
        </h2>
        <h2
          className={`${styles.periodTitle} ${styles.titleMobile}`}
          aria-hidden="true"
        >
          Выбор периода
        </h2>
        <div className={styles.modeSwitch}>
          <button
            className={`${styles.modeBtn} ${
              mode === "month" ? styles.active : ""
            }`}
            data-mode="month"
            onClick={() => setMode("month")}
          >
            Месяц
          </button>
          <button
            className={`${styles.modeBtn} ${
              mode === "year" ? styles.active : ""
            }`}
            data-mode="year"
            onClick={() => setMode("year")}
          >
            Год
          </button>
        </div>
      </div>
      <div
        className={`${styles.weekdays} ${mode === "year" ? styles.hidden : ""}`}
      >
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <hr className={styles.divider} />
      <div
        className={`${styles.calendarView} ${
          mode === "month" ? styles.active : ""
        }`}
        id="month-view"
      >
        <div
          className={styles.calendarScroll}
          role="group"
          aria-label="Календарь периода"
        >
          <div className={styles.month} aria-labelledby="jul-2024">
            <h3 id="jul-2024" className={styles.monthTitle}>
              Июль 2024
            </h3>
            <div
              className={styles.daysGrid}
              role="grid"
              aria-label="Даты июля 2024"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const value = { month: "jul-2024", day };
                return (
                  <button
                    key={`jul-${day}`}
                    className={`${styles.day} ${
                      isInRange("day", value) ? styles.selected : ""
                    }`}
                    aria-pressed={isInRange("day", value)}
                    onClick={() => handleClick("day", value)}
                    onMouseDown={() => handleMouseDown("day", value)}
                    onMouseOver={() => handleMouseOver("day", value)}
                    onMouseUp={handleMouseUp}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.month} aria-labelledby="aug-2024">
            <h3 id="aug-2024" className={styles.monthTitle}>
              Август 2024
            </h3>
            <div
              className={styles.daysGrid}
              role="grid"
              aria-label="Даты августа 2024"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`aug-empty-${i}`}
                  className={`${styles.day} ${styles.empty}`}
                  aria-hidden="true"
                ></div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const value = { month: "aug-2024", day };
                return (
                  <button
                    key={`aug-${day}`}
                    className={`${styles.day} ${
                      isInRange("day", value) ? styles.selected : ""
                    }`}
                    aria-pressed={isInRange("day", value)}
                    onClick={() => handleClick("day", value)}
                    onMouseDown={() => handleMouseDown("day", value)}
                    onMouseOver={() => handleMouseOver("day", value)}
                    onMouseUp={handleMouseUp}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.calendarView} ${
          mode === "year" ? styles.active : ""
        }`}
        id="year-view"
      >
        <div
          className={styles.calendarScroll}
          role="group"
          aria-label="Календарь периода"
        >
          {[2024, 2025].map((year) => (
            <div key={year}>
              <h3 className={styles.yearTitle}>{year}</h3>
              <div
                className={styles.yearGrid}
                role="grid"
                aria-label={`Месяцы ${year}`}
              >
                {MONTHS.map((month) => {
                  const value = { year, month };
                  return (
                    <button
                      key={`${year}-${month}`}
                      className={`${styles.monthItem} ${
                        isInRange("month", value) ? styles.selected : ""
                      }`}
                      aria-pressed={isInRange("month", value)}
                      onClick={() => handleClick("month", value)}
                      onMouseDown={() => handleMouseDown("month", value)}
                      onMouseOver={() => handleMouseOver("month", value)}
                      onMouseUp={handleMouseUp}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarView;
