import { useState, useEffect } from "react";
import { format, getDaysInMonth } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import { MONTHS, WEEKDAYS } from "./constants";
import styles from "./CostAnalysis.module.css";

const CalendarView = ({ mode, setMode, onPeriodChange }) => {
  const [dayRange, setDayRange] = useState({
    start: { month: "jul-2024", day: 10 },
    end: { month: "jul-2024", day: 10 },
  });
  const [monthRange, setMonthRange] = useState({
    start: { year: 2024, month: "Июль" },
    end: { year: 2024, month: "Июль" },
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const [displayedMonths, setDisplayedMonths] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Генерация всех месяцев (2023–2026)
  const startYear = 2023;
  const endYear = 2026;
  const allMonths = [];
  for (let year = startYear; year <= endYear; year++) {
    MONTHS.forEach((month, index) => {
      allMonths.push({ year, month, monthIndex: index });
    });
  }

  // Инициализация первых 6 месяцев
  useEffect(() => {
    setDisplayedMonths(allMonths.slice(0, 6));
  }, []);

  // Загрузка следующих месяцев
  const loadMoreMonths = () => {
    const nextMonths = allMonths.slice(
      displayedMonths.length,
      displayedMonths.length + 6
    );
    if (nextMonths.length === 0) {
      setHasMore(false);
      return;
    }
    setDisplayedMonths((prev) => [...prev, ...nextMonths]);
  };

  // Форматирование для API
  const formatPeriod = (range, mode) => {
    if (mode === "month") {
      const startDate = new Date(range.start.month);
      const endDate = new Date(range.end.month);
      return {
        start: format(
          new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            range.start.day
          ),
          "MM-dd-yyyy"
        ),
        end: format(
          new Date(endDate.getFullYear(), endDate.getMonth(), range.end.day),
          "MM-dd-yyyy"
        ),
      };
    } else {
      const startMonthIndex = MONTHS.indexOf(range.start.month);
      const endMonthIndex = MONTHS.indexOf(range.end.month);
      return {
        start: format(
          new Date(range.start.year, startMonthIndex, 1),
          "MM-dd-yyyy"
        ),
        end: format(
          new Date(
            range.end.year,
            endMonthIndex,
            getDaysInMonth(new Date(range.end.year, endMonthIndex))
          ),
          "MM-dd-yyyy"
        ),
      };
    }
  };

  // Вызов callback при изменении периода
  useEffect(() => {
    onPeriodChange(
      formatPeriod(mode === "month" ? dayRange : monthRange, mode)
    );
  }, [dayRange, monthRange, mode, onPeriodChange]);

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
      const startDate = new Date(range.start.month);
      const endDate = new Date(range.end.month);
      start = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        range.start.day
      );
      end = new Date(endDate.getFullYear(), endDate.getMonth(), range.end.day);
      current = new Date(
        new Date(value.month).getFullYear(),
        new Date(value.month).getMonth(),
        value.day
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
        <InfiniteScroll
          dataLength={displayedMonths.length}
          next={loadMoreMonths}
          hasMore={hasMore}
          loader={<h4>Загрузка...</h4>}
          scrollableTarget="month-view"
        >
          <div
            className={styles.calendarScroll}
            role="group"
            aria-label="Календарь периода"
          >
            {displayedMonths.map(({ year, month, monthIndex }) => {
              const daysInMonth = getDaysInMonth(new Date(year, monthIndex));
              const firstDay = new Date(year, monthIndex, 1).getDay();
              const offset = firstDay === 0 ? 6 : firstDay - 1; // Смещение для первого дня недели
              return (
                <div
                  key={`${year}-${month}`}
                  className={styles.month}
                  aria-labelledby={`${year}-${month}`}
                >
                  <h3 id={`${year}-${month}`} className={styles.monthTitle}>
                    {month} {year}
                  </h3>
                  <div
                    className={styles.daysGrid}
                    role="grid"
                    aria-label={`Даты ${month} ${year}`}
                  >
                    {Array.from({ length: offset }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className={`${styles.day} ${styles.empty}`}
                        aria-hidden="true"
                      ></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => {
                        const value = { month: `${month}-${year}`, day };
                        return (
                          <button
                            key={`${month}-${day}`}
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
                      }
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
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
          {[...Array(endYear - startYear + 1)].map((_, i) => {
            const year = startYear + i;
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CalendarView;
