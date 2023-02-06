import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const [inputToggle, setInputToggle] = useState(false);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const handleToggle = () => {
    setInputToggle(!inputToggle);
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.textContent = `감정 일기장`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  return (
    <div className="Home">
      <MyHeader
        headText={
          <MyButton type={"header"} text={headText} onClick={handleToggle} />
        }
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <div className="input_wrap">
        <input
          type={"date"}
          className={inputToggle ? "show_input" : "hide_input"}
          onChange={(e) => {
            setCurDate(new Date(e.target.value));
          }}
        />
      </div>

      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
