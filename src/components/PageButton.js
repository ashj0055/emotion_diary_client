import React, { useState } from "react";

const PageButton = ({ totalCount, limit, setPage }) => {
  const [btnIndex, setBtnIndex] = useState(0);

  const btnArr = [];
  let arr = [];

  for (let i = 1; i <= Math.ceil(totalCount / limit); i++) {
    arr.push(i);
    if (arr.length === 5 || arr.includes(Math.ceil(totalCount / limit))) {
      btnArr.push(arr);
      arr = [];
    }
  }

  const handleClick = (e) => {
    const num = e.target.textContent;
    setPage(num);
  };

  return (
    <div className="PageButton">
      <button
        onClick={() => {
          setBtnIndex(btnIndex - 1);
        }}
        disabled={btnIndex === 0}
      >
        {"<"}
      </button>
      {btnArr[btnIndex]?.map((num, idx) => {
        return (
          <button key={idx} onClick={handleClick}>
            {num}
          </button>
        );
      })}
      <button
        onClick={() => {
          setBtnIndex(btnIndex + 1);
        }}
        disabled={btnIndex === btnArr.length - 1}
      >
        {">"}
      </button>
    </div>
  );
};

export default React.memo(PageButton);
