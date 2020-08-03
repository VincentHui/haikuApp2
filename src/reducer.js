import { combineReducers } from "redux";
import { homeTiles, SelectedTile, Modal } from "../src/homeTiles/reducers";

export default combineReducers({
  homeTiles,
  SelectedTile,
  Modal,
});
