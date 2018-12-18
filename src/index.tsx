import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import {LocaleProvider} from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import * as moment from "moment";
import "moment/locale/zh-cn";
import {Provider} from "react-redux"
import store from "./redux/Store";

moment.locale("zh-cn");

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <App/>
        </LocaleProvider>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
registerServiceWorker();
