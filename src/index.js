import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter, browserHistory, Router } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
import Root from "./Root";

require("./stylesheet/global.css");
require("./stylesheet/sites.css");
require("./stylesheet/trix.css");
// import * as serviceWorker from './serviceWorker';

const history = createHashHistory();

ReactDOM.render(
    <HashRouter>
        <Root />
    </HashRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
