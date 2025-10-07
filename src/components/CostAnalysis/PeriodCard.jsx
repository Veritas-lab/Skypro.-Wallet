import { useEffect, useRef } from "react";
import styles from "./CostAnalysis.module.css";
import MobileBackButton from "./MobileBackButton";
import CalendarView from "./CalendarView";

const PeriodCard = ({
  isOpen,
  setIsOpen,
  mode,
  setMode,
  onPeriodChange,
  onConfirm,
}) => {
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
        <MobileBackButton
          onClick={() => {
            setIsOpen(false);
            onConfirm();
          }}
        />
        <CalendarView
          mode={mode}
          setMode={setMode}
          onPeriodChange={onPeriodChange}
        />
      </div>
      <div className={styles.decorBar} aria-hidden="true">
        <div className={styles.thumb} ref={thumbRef}></div>
      </div>
    </section>
  );
};

export default PeriodCard;
