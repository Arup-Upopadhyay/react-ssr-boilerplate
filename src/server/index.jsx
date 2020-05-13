import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../common/components/App.jsx";
import { Helmet } from 'react-helmet';
import htmlTemplate from "../common/utils/template.jsx";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../common/reducers/allReducers.jsx';

async function handleRender(req, res) {
    const ServerApp = ({store}) => (
        <Provider store={store}>
            <App />
        </Provider>
    );

    const store = createStore(allReducers);

    const preloadedState = store.getState();

    const reactHtml = ReactDOMServer.renderToString(<ServerApp store={store} />);

    const helmetData = Helmet.renderStatic( );

    res.writeHead( 200, { "Content-Type": "text/html" } );

    res.end( htmlTemplate( reactHtml, helmetData ,preloadedState ) );
}

const app = express();

app.use("/public", express.static("./dist/public"));

app.get("*", handleRender);
app.listen(3000);
console.log("App is running on http://localhost:3000");
