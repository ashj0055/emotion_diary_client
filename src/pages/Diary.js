import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = ({ diaryService }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      diaryService
        .getDiary(id)
        .then((diary) => {
          if (diary) {
            setData(diary);
            const titleElement = document.getElementsByTagName("title")[0];
            titleElement.textContent = `${getStringDate(
              new Date(diary.date)
            )} 기록`;
          } else {
            alert("존재하지 않는 일기입니다");
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id, diaryList]);

  const navigateEditPage = () => {
    navigate(`/edit/${data.id}`);
  };

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => it.emotion_id === data.emotion
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={<MyButton text={"수정하기"} onClick={navigateEditPage} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="감정 이미지" />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
