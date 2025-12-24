const Pagination = ({ total, perPage, current, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  return (
    <div style={styles.container}>
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          style={
            current === i + 1 ? styles.activeBtn : styles.btn
          }
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={current === totalPages}
        onClick={() => onPageChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "40px",
  },
  btn: {
    padding: "6px 12px",
    cursor: "pointer",
  },
  activeBtn: {
    padding: "6px 12px",
    background: "#4a6cf7",
    color: "white",
    cursor: "pointer",
  },
};

export default Pagination;
