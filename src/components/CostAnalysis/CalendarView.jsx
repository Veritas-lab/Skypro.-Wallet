import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./CostAnalysis.module.css";
import { MONTHS, WEEKDAYS } from "./constants";

const CalendarView = ({ mode, setMode, onPeriodChange }) => {
  const [dayRange, setDayRange] = useState({
    start: null,
    end: null,
  });
  const [monthRange, setMonthRange] = useState({
    start: null,
    end: null,
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const scrollRef = useRef(null);

  // Функция для расчета количества дней в месяце
  const daysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Функция для расчета смещения первого дня месяца (для пустых ячеек)
  const calculateOffset = (year, monthIndex) => {
    const fd = new Date(year, monthIndex, 1).getDay();
    return fd === 0 ? 6 : fd - 1;
  };

  // Создание объекта месяца
  const createMonthObj = useCallback((year, monthIndex) => {
    return {
      year,
      monthIndex,
      key: `${year}-${monthIndex + 1}`,
      name: `${MONTHS[monthIndex]} ${year}`,
      days: daysInMonth(year, monthIndex),
      offset: calculateOffset(year, monthIndex),
    };
  }, []); // Пустой массив зависимостей, так как MONTHS, daysInMonth и calculateOffset стабильны

  // Инициализация списка месяцев для month mode
  useEffect(() => {
    if (mode === "month") {
      const currentDate = new Date(2025, 9, 6); // October 06, 2025 (month 9)
      let startYear = currentDate.getFullYear() - 1;
      let startMonth = currentDate.getMonth();
      const list = [];
      let y = startYear;
      let m = startMonth;
      for (let i = 0; i < 36; i++) {
        // Начальный набор: 3 года (36 месяцев)
        list.push(createMonthObj(y, m));
        m++;
        if (m > 11) {
          m = 0;
          y++;
        }
      }
      setMonthList(list);
      // Установить начальный период (текущий месяц)
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

  // Инициализация списка годов для year mode
  useEffect(() => {
    if (mode === "year") {
      const currentYear = 2025;
      const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
      setYearList(years);
      // Установить начальный период (текущий год)
      setMonthRange({
        start: { year: currentYear, month: 0 },
        end: { year: currentYear, month: 11 },
      });
    }
  }, [mode]);

  // Обработчик бесконечного скролла (только вниз)
  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const threshold = 200;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
        if (mode === "month") {
          setMonthList((prev) => {
            let last = prev[prev.length - 1];
            let ny = last.year;
            let nm = last.monthIndex + 1;
            if (nm > 11) {
              nm = 0;
              ny++;
            }
            const adds = [];
            for (let j = 0; j < 6; j++) {
              adds.push(createMonthObj(ny, nm));
              nm++;
              if (nm > 11) {
                nm = 0;
                ny++;
              }
            }
            return [...prev, ...adds];
          });
        } else if (mode === "year") {
          setYearList((prev) => {
            const nextYear = prev[prev.length - 1] + 1;
            const adds = [];
            for (let j = 0; j < 5; j++) {
              adds.push(nextYear + j);
            }
            return [...prev, ...adds];
          });
        }
      }
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [mode, createMonthObj]);

  // Форматирование даты в MM-DD-YYYY
  const formatDate = (date) => {
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${m}-${d}-${y}`;
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
    let actualStart, actualEnd;
    if (mode === "month") {
      if (!dayRange.start || !dayRange.end) return;
      const s = dayRange.start;
      const e = dayRange.end;
      const sd = new Date(s.year, s.monthIndex, s.day);
      const ed = new Date(e.year, e.monthIndex, e.day);
      actualStart = new Date(Math.min(sd, ed));
      actualEnd = new Date(Math.max(sd, ed));
    } else {
      if (!monthRange.start || !monthRange.end) return;
      const s = monthRange.start;
      const e = monthRange.end;
      const sm = Math.min(s.year * 12 + s.month, e.year * 12 + e.month);
      const em = Math.max(s.year * 12 + e.month, e.year * 12 + e.month);
      const startYear = Math.floor(sm / 12);
      const startMonth = sm % 12;
      const endYear = Math.floor(em / 12);
      const endMonth = em % 12;
      actualStart = new Date(startYear, startMonth, 1);
      actualEnd = new Date(endYear, endMonth + 1, 0);
    }

    onPeriodChange({
      start: formatDate(actualStart),
      end: formatDate(actualEnd),
    });
  };

  const handleClick = (type, value) => {
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
  };

  const isInRange = (type, value) => {
    let start, end, current;
    if (type === "day") {
      const range = dayRange;
      if (!range.start || !range.end) return false;
      start = new Date(
        range.start.year,
        range.start.monthIndex,
        range.start.day
      ).getTime();
      end = new Date(
        range.end.year,
        range.end.monthIndex,
        range.end.day
      ).getTime();
      current = new Date(value.year, value.monthIndex, value.day).getTime();
    } else {
      const range = monthRange;
      if (!range.start || !range.end) return false;
      start = range.start.year * 12 + range.start.month;
      end = range.end.year * 12 + range.end.month;
      current = value.year * 12 + value.month;
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
                  ></div>
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
                      onMouseDown={() => handleMouseDown("month", value)}
                      onMouseOver={() => handleMouseOver("month", value)}
                      onMouseUp={handleMouseUp}
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

export default CalendarView;
