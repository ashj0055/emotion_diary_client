import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";
import PageButton from "./PageButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 4;

  const getProcessedList = () => {
    const filterCallback = (item) => {
      if (filter === "good") return parseInt(item.emotion) <= 3;
      else return parseInt(item.emotion) > 3;
    };
    const compare = (a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      else return parseInt(a.date) - parseInt(b.date);
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);

    return [sortedList, sortedList.length];
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedList()[0]
        .slice((page - 1) * limit, (page - 1) * limit + limit)
        .map((diary) => {
          return <DiaryItem key={diary._id} {...diary} />;
        })}

      {getProcessedList()[1] > 0 && (
        <PageButton
          totalCount={getProcessedList()[1]}
          limit={limit}
          setPage={setPage}
        />
      )}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
