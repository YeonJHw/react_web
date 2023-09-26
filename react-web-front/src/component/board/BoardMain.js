import { Route, Routes } from "react-router-dom";
import "./board.css";
import BoardList from "./BoardList";
const BoardMain = () => {
  return (
    <div className="board-all-wrap">
      <div className="board-title">BOARD</div>
      <Routes>
        <Route path="*" element={<BoardList />}></Route>
      </Routes>
    </div>
  );
};
export default BoardMain;
