import { createStore } from "redux";
import reducer from "./reducers";

function configStore(state = { rotating: true }) {
  return createStore(reducer,state);
}

export default configStore;