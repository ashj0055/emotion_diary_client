import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import MyButton from "./MyButton";

const DiaryItem = ({ _id, emotion, content, date }) => {
  const { onRemove } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const id = _id;

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onRemove(id);
    } else return;
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="감정 이미지"
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"삭제하기"} type={"negative"} onClick={handleDelete} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
