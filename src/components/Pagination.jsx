import React from "react";
import styles from "../styles/pagination.module.css"

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  return (
    <div>
      {Array.from(Array(pages), (item, index) => (
        <button
            key={index}
            className = {styles.btn}
            value={index}
            onClick={(e) => setCurrentPage(Number(e.target.value))}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
