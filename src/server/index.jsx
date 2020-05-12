import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../client/app.jsx";
import { Helmet } from 'react-helmet';
import htmlTemplate from "../common/utils/template.jsx";

async function handleRender(req, res) {
    const reactHtml = ReactDOMServer.renderToString(<App />);
    const helmetData = Helmet.renderStatic( );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactHtml, helmetData ) );
}

const app = express();

app.use("/public", express.static("./dist/public"));

app.get("*", handleRender);
app.listen(3000);
console.log("App is running on http://localhost:3000");
