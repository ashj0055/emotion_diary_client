import React, { useState } from "react";

const PageButton = ({ totalCount, limit, setPage }) => {
  const [btnIndex, setBtnIndex] = useState(0);
  const [btnNum, setBtnNum] = useState(1);

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
    setBtnNum(e.target.textContent);
    setPage(e.target.textContent);
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
          <div
            key={idx}
            onClick={handleClick}
            className={num == btnNum ? "clickedBtn" : ""}
          >
            {num}
          </div>
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
