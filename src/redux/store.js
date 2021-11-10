// 用来根据老的state和指定的action生成并返回新的state的函数
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
