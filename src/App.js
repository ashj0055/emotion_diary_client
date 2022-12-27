import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import DiaryService from "./service/diary";

const baseURL = process.env.REACT_APP_BASE_URL;
const diaryService = new DiaryService(baseURL);

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];

      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it._id !== action.targetId);

      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it._id === action.data._id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    diaryService
      .getDiary()
      .then((diary) => {
        dispatch({ type: "INIT", data: diary });
      })
      .catch((err) => console.log("err", err));
  }, []);

  // CREATE
  const onCreate = (date, content, emotion) => {
    diaryService
      .postDiary(date, content, emotion)
      .then((diary) => {
        if (diary) dispatch({ type: "CREATE", data: diary });
      })
      .catch((err) => {
        console.log(err);
        alert("일기 작성에 실패했습니다. 다시 시도해주세요");
      });
  };

  // REMOVE
  const onRemove = (targetId) => {
    diaryService
      .deleteDiary(targetId)
      .then((res) => {
        if (res) dispatch({ type: "REMOVE", targetId });
      })
      .catch((err) => console.log(err));
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    diaryService
      .updateDiary(targetId, new Date(date).getTime(), content, emotion)
      .then((diary) => {
        if (diary) dispatch({ type: "EDIT", data: diary });
      })
      .catch((err) => console.log(err));
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
              <Route
                path="/diary/:id"
                element={<Diary diaryService={diaryService} />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
