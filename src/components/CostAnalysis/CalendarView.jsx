import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./CostAnalysis.module.css";
import { MONTHS, WEEKDAYS } from "./constants";
import { daysInMonth, calculateOffset, formatDate } from "./utils";

const CalendarView = ({ mode, setMode, onPeriodChange }) => {
  const [dayRange, setDayRange] = useState({ start: null, end: null });
  const [monthRange, setMonthRange] = useState({ start: null, end: null });
  const [isSelecting, setIsSelecting] = useState(false);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const scrollRef = useRef(null);

  // Создание объекта месяца
  const createMonthObj = useCallback(
    (year, monthIndex) => ({
      year,
      monthIndex,
      key: `${year}-${monthIndex + 1}`,
      name: `${MONTHS[monthIndex]} ${year}`,
      days: daysInMonth(year, monthIndex),
      offset: calculateOffset(year, monthIndex),
    }),
    []
  );

  useEffect(() => {
    if (mode === "month") {
      const currentDate = new Date(2025, 9, 6);
      const startYear = currentDate.getFullYear() - 1;
      const startMonth = currentDate.getMonth();
      const list = [];
      let year = startYear;
      let month = startMonth;

      for (let i = 0; i < 36; i++) {
        list.push(createMonthObj(year, month));
        month++;
        if (month > 11) {
          month = 0;
          year++;
        }
      }
      setMonthList(list);

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
      setDayRange({
        start: {
          year: start.getFullYear(),
          monthIndex: start.getMonth(),
          day: start.getDate(),
        },
        end: {
          year: end.getFullYear(),
          monthIndex: end.getMonth(),
          day: end.getDate(),
        },
      });
    }
  }, [mode, createMonthObj]);

  useEffect(() => {
    if (mode === "year") {
      const currentYear = 2025;
      const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
      setYearList(years);
      setMonthRange({
        start: { year: currentYear, month: 0 },
        end: { year: currentYear, month: 11 },
      });
    }
  }, [mode]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.scrollHeight - el.scrollTop - el.clientHeight >= 200) return;

    if (mode === "month") {
      setMonthList((prev) => {
        const last = prev[prev.length - 1];
        let year = last.year;
        let month = last.monthIndex + 1;
        const adds = [];

        if (month > 11) {
          month = 0;
          year++;
        }
        for (let j = 0; j < 6; j++) {
          adds.push(createMonthObj(year, month));
          month++;
          if (month > 11) {
            month = 0;
            year++;
          }
        }
        return [...prev, ...adds];
      });
    } else if (mode === "year") {
      setYearList((prev) => {
        const nextYear = prev[prev.length - 1] + 1;
        return [...prev, ...Array.from({ length: 5 }, (_, j) => nextYear + j)];
      });
    }
  }, [mode, createMonthObj]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const handleRangeSelection = useCallback(
    (type, value, action) => {
      if (action === "down") {
        setIsSelecting(true);
        if (type === "day") setDayRange({ start: value, end: value });
        else setMonthRange({ start: value, end: value });
      } else if (action === "over" && isSelecting) {
        if (type === "day") setDayRange((prev) => ({ ...prev, end: value }));
        else setMonthRange((prev) => ({ ...prev, end: value }));
      } else if (action === "up") {
        setIsSelecting(false);
        let start, end;

        if (type === "day") {
          if (!dayRange.start || !dayRange.end) return;
          start = new Date(
            dayRange.start.year,
            dayRange.start.monthIndex,
            dayRange.start.day
          );
          end = new Date(
            dayRange.end.year,
            dayRange.end.monthIndex,
            dayRange.end.day
          );
        } else {
          if (!monthRange.start || !monthRange.end) return;
          const s = monthRange.start;
          const e = monthRange.end;
          const sm = Math.min(s.year * 12 + s.month, e.year * 12 + e.month);
          const em = Math.max(s.year * 12 + s.month, e.year * 12 + e.month);
          start = new Date(Math.floor(sm / 12), sm % 12, 1);
          end = new Date(Math.floor(em / 12), (em % 12) + 1, 0);
        }

        onPeriodChange({
          start: formatDate(new Date(Math.min(start, end))),
          end: formatDate(new Date(Math.max(start, end))),
        });
      }
    },
    [isSelecting, dayRange, monthRange, onPeriodChange]
  );

  const handleClick = useCallback(
    (type, value) => {
      if (type === "day") {
        setDayRange({ start: value, end: value });
        const selectedDate = new Date(value.year, value.monthIndex, value.day);
        onPeriodChange({
          start: formatDate(selectedDate),
          end: formatDate(selectedDate),
        });
      } else {
        setMonthRange({ start: value, end: value });
        const startDate = new Date(value.year, value.month, 1);
        const endDate = new Date(value.year, value.month + 1, 0);
        onPeriodChange({
          start: formatDate(startDate),
          end: formatDate(endDate),
        });
      }
    },
    [onPeriodChange]
  );

  const isInRange = useCallback(
    (type, value) => {
      let start, end, current;
      if (type === "day") {
        if (!dayRange.start || !dayRange.end) return false;
        start = new Date(
          dayRange.start.year,
          dayRange.start.monthIndex,
          dayRange.start.day
        ).getTime();
        end = new Date(
          dayRange.end.year,
          dayRange.end.monthIndex,
          dayRange.end.day
        ).getTime();
        current = new Date(value.year, value.monthIndex, value.day).getTime();
      } else {
        if (!monthRange.start || !monthRange.end) return false;
        start = monthRange.start.year * 12 + monthRange.start.month;
        end = monthRange.end.year * 12 + monthRange.end.month;
        current = value.year * 12 + value.month;
      }
      return current >= Math.min(start, end) && current <= Math.max(start, end);
    },
    [dayRange, monthRange]
  );

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
          ref={scrollRef}
        >
          {monthList.map((monthObj) => (
            <div
              key={monthObj.key}
              className={styles.month}
              aria-labelledby={monthObj.key}
            >
              <h3 id={monthObj.key} className={styles.monthTitle}>
                {monthObj.name}
              </h3>
              <div
                className={styles.daysGrid}
                role="grid"
                aria-label={`Даты ${monthObj.name}`}
              >
                {Array.from({ length: monthObj.offset }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className={`${styles.day} ${styles.empty}`}
                    aria-hidden="true"
                  />
                ))}
                {Array.from({ length: monthObj.days }, (_, i) => i + 1).map(
                  (day) => {
                    const value = {
                      year: monthObj.year,
                      monthIndex: monthObj.monthIndex,
                      day,
                    };
                    return (
                      <button
                        key={`${monthObj.key}-${day}`}
                        className={`${styles.day} ${
                          isInRange("day", value) ? styles.selected : ""
                        }`}
                        aria-pressed={isInRange("day", value)}
                        onClick={() => handleClick("day", value)}
                        onMouseDown={() =>
                          handleRangeSelection("day", value, "down")
                        }
                        onMouseOver={() =>
                          handleRangeSelection("day", value, "over")
                        }
                        onMouseUp={() =>
                          handleRangeSelection("day", value, "up")
                        }
                      >
                        {day}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ))}
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
          ref={scrollRef}
        >
          {yearList.map((year) => (
            <div key={year}>
              <h3 className={styles.yearTitle}>{year}</h3>
              <div
                className={styles.yearGrid}
                role="grid"
                aria-label={`Месяцы ${year}`}
              >
                {MONTHS.map((monthName, monthIndex) => {
                  const value = { year, month: monthIndex };
                  return (
                    <button
                      key={`${year}-${monthIndex}`}
                      className={`${styles.monthItem} ${
                        isInRange("month", value) ? styles.selected : ""
                      }`}
                      aria-pressed={isInRange("month", value)}
                      onClick={() => handleClick("month", value)}
                      onMouseDown={() =>
                        handleRangeSelection("month", value, "down")
                      }
                      onMouseOver={() =>
                        handleRangeSelection("month", value, "over")
                      }
                      onMouseUp={() =>
                        handleRangeSelection("month", value, "up")
                      }
                    >
                      {monthName}
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

CalendarView.propTypes = {
  mode: PropTypes.oneOf(["month", "year"]).isRequired,
  setMode: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
};

export default CalendarView;
