import {
    createStore
} from "redux";
import Reducers from "./reducer/Reducers";

// 创建store对象
const store = createStore(Reducers);
export default store