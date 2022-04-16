import styles from "./Pagination.module.less";

const Pagination: React.FC<{
  tot: number;
  cur: number;
  change: (to: number) => void;
}> = ({ tot, cur, change }) => {
  function handlePrev() {
    if (cur !== 1) change(cur - 1);
  }

  function handleNext() {
    if (cur !== tot) change(cur + 1);
  }

  function handleJump(target: number) {
    if (cur !== target) change(target);
  }

  const pageList: JSX.Element[] = [];

  if (tot > 5) {
    let bg1 = 0,
      bg2 = 0,
      ed1 = 0,
      ed2 = 0;
    let mid = false;
    if (cur <= 3) {
      bg1 = 1;
      ed1 = 3;
      bg2 = tot;
      ed2 = tot;
    } else if (cur >= tot - 2) {
      bg1 = 1;
      ed1 = 1;
      bg2 = tot - 2;
      ed2 = tot;
    } else {
      mid = true;
      bg1 = 1;
      ed1 = 1;
      bg2 = tot;
      ed2 = tot;
    }
    if (!mid) {
      for (let i = bg1; i <= ed1; i++) {
        pageList.push(
          <button
            onClick={() => handleJump(i)}
            className={i === cur ? styles.current : undefined}
          >
            {i}
          </button>
        );
      }
      pageList.push(<button disabled>..</button>);
      for (let i = bg2; i <= ed2; i++) {
        pageList.push(
          <button
            onClick={() => handleJump(i)}
            className={i === cur ? styles.current : undefined}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = bg1; i <= ed1; i++) {
        pageList.push(
          <button
            onClick={() => handleJump(i)}
            className={i === cur ? styles.current : undefined}
          >
            {i}
          </button>
        );
      }
      pageList.push(<button disabled>..</button>);
      for (let i = cur - 1; i <= cur + 1; i++) {
        pageList.push(
          <button
            onClick={() => handleJump(i)}
            className={i === cur ? styles.current : undefined}
          >
            {i}
          </button>
        );
      }
      pageList.push(<button disabled>..</button>);
      for (let i = bg2; i <= ed2; i++) {
        pageList.push(
          <button
            onClick={() => handleJump(i)}
            className={i === cur ? styles.current : undefined}
          >
            {i}
          </button>
        );
      }
    }
  } else {
    for (let i = 1; i <= tot; i++) {
      pageList.push(
        <button
          onClick={() => handleJump(i)}
          className={i === cur ? styles.current : undefined}
        >
          {i}
        </button>
      );
    }
  }

  return (
    <div className={styles.pagination}>
      <button disabled={cur === 1} onClick={handlePrev}>
        &lt;
      </button>
      {pageList}
      <button disabled={cur === tot} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
