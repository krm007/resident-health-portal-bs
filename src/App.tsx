import createHashHistory from "history/createHashHistory";
import * as React from 'react';
import {
    /*BrowserRouter,*/ HashRouter,
    Route,
    Router,
    Switch
} from "react-router-dom";
import './App.css';
const hashHistory = createHashHistory();
import MainLayout from './views/layout/MainLayout';
class App extends React.Component {
    public render() {
        return (
            <div className="App">

                <HashRouter>
                    <Router history={hashHistory}>
                        <Switch>
                            {/*bs web*/}
                            <Route path={"/"} component={MainLayout} />
                        </Switch>
                    </Router>
                </HashRouter>
            </div>
        );
    }
}

export default App;
