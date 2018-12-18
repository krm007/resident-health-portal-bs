import {fromJS} from "immutable";
import {AnyAction} from "redux";
import {handleActions} from "redux-actions";
import {combineReducers} from "redux-immutable";
import {
    LOGIN,
    LOGOUT
} from "../ActionTypes";
// 登陆或登出
const loginOrLogoutReducer = handleActions<any>(
    {
        [LOGIN]: (state, action: AnyAction) => {
            return state.set("user", fromJS(action.payload));
        },
        [LOGOUT]: (state, action: AnyAction) => {
            return state.set("user", fromJS({}))
        }
    },
    fromJS({user: {}})// 设置初始值
);

export default combineReducers({
    loginOrLogoutReducer
})