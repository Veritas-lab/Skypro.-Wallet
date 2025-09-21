import React, { useState, useEffect, useRef } from "react";
import styles from "./CostAnalysis.module.css";

const Header = () => (
  <header className={styles.pageHeader} role="banner">
    <h1 className={styles.pageTitle}>Анализ расходов</h1>
  </header>
);

const MobileBackButton = ({ onClick }) => (
  <button
    id="back-analysis"
    className={styles.mobileBack}
    type="button"
    aria-hidden="true"
    onClick={onClick}
  >
    <svg
      className={styles.mobileBackIcon}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.44413 1.16675H4.55579C2.43246 1.16675 1.16663 2.43258 1.16663 4.55591V9.43841C1.16663 11.5676 2.43246 12.8334 4.55579 12.8334H9.43829C11.5616 12.8334 12.8275 11.5676 12.8275 9.44425V4.55591C12.8333 2.43258 11.5675 1.16675 9.44413 1.16675ZM10.5 7.43758H4.55579L6.31163 9.19341C6.48079 9.36258 6.48079 9.64258 6.31163 9.81175C6.22413 9.89925 6.11329 9.94008 6.00246 9.94008C5.89163 9.94008 5.78079 9.89925 5.69329 9.81175L3.19079 7.30925C3.10913 7.22758 3.06246 7.11675 3.06246 7.00008C3.06246 6.88341 3.10913 6.77258 3.19079 6.69091L5.69329 4.18841C5.86246 4.01925 6.14246 4.01925 6.31163 4.18841C6.48079 4.35758 6.48079 4.63758 6.31163 4.80675L4.55579 6.56258H10.5C10.7391 6.56258 10.9375 6.76091 10.9375 7.00008C10.9375 7.23925 10.7391 7.43758 10.5 7.43758Z"
        fill="#999999"
      />
    </svg>
    <span className={styles.mobileBackText}>Анализ расходов</span>
  </button>
);

const CalendarView = ({ mode, setMode }) => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
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
      start = months.indexOf(range.start.month) + range.start.year * 12;
      end = months.indexOf(range.end.month) + range.end.year * 12;
      current = months.indexOf(value.month) + value.year * 12;
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
        {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((day) => (
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
                {months.map((month) => {
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

const PeriodCard = ({ isOpen, setIsOpen, mode, setMode }) => {
  const calendarRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const updateScrollbar = () => {
      if (!thumbRef.current || !calendarRef.current) return;
      const activeCalendarView = calendarRef.current.querySelector(
        `.${styles.calendarView}.${styles.active}`
      );
      if (!activeCalendarView) return;
      const calendarScroll = activeCalendarView.querySelector(
        `.${styles.calendarScroll}`
      );
      if (!calendarScroll) return;

      const totalHeight = calendarScroll.scrollHeight;
      const visibleHeight = calendarScroll.clientHeight;
      const decorHeight = thumbRef.current.parentElement.clientHeight;

      if (totalHeight <= visibleHeight) {
        thumbRef.current.parentElement.classList.add(styles.hidden);
        return;
      } else {
        thumbRef.current.parentElement.classList.remove(styles.hidden);
      }

      const thumbHeight = Math.max(
        20,
        (visibleHeight / totalHeight) * decorHeight
      );
      thumbRef.current.style.height = `${thumbHeight}px`;
      const scrollTop = calendarScroll.scrollTop;
      const maxScroll = totalHeight - visibleHeight;
      const maxThumbTop = decorHeight - thumbHeight;
      const thumbTop = (scrollTop / maxScroll) * maxThumbTop;
      thumbRef.current.style.top = `${thumbTop}px`;
    };

    const activeCalendarView = calendarRef.current?.querySelector(
      `.${styles.calendarView}.${styles.active}`
    );
    if (activeCalendarView) {
      const calendarScroll = activeCalendarView.querySelector(
        `.${styles.calendarScroll}`
      );
      if (calendarScroll) {
        calendarScroll.addEventListener("scroll", updateScrollbar);
        window.addEventListener("resize", updateScrollbar);
        updateScrollbar();
        return () => {
          calendarScroll.removeEventListener("scroll", updateScrollbar);
          window.removeEventListener("resize", updateScrollbar);
        };
      }
    }
  }, [mode]);

  return (
    <section
      className={`${styles.periodCard} ${isOpen ? styles.open : ""}`}
      aria-hidden={!isOpen}
      role="region"
      aria-labelledby="period-title"
      ref={calendarRef}
    >
      <div className={styles.periodInner}>
        <MobileBackButton onClick={() => setIsOpen(false)} />
        <CalendarView mode={mode} setMode={setMode} />
      </div>
      <div className={styles.decorBar} aria-hidden="true">
        <div className={styles.thumb} ref={thumbRef}></div>
      </div>
    </section>
  );
};

const CostAnalysis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("month");

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
      <main className={styles.pageRow} role="main">
        <PeriodCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          mode={mode}
          setMode={setMode}
        />
        <ChartView />
      </main>
      <footer className={styles.periodFooter}>
        <button
          id="open-period-btn"
          className={styles.periodAction}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.periodActionText}>
            {isOpen ? "Выбрать период" : "Выбрать другой период"}
          </span>
        </button>
      </footer>
    </div>
  );
};

export default CostAnalysis;
