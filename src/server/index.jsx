import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../common/components/App.jsx';
import { Helmet } from 'react-helmet';
import htmlTemplate from '../common/utils/template.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../common/reducers/allReducers.jsx';
import morgan from 'morgan';
import winston from '../../winston';

const PORT = process.env.PORT || 3000;

async function handleRender(req, res) {
    const store = createStore(allReducers);

    const preloadedState = store.getState();

    const ServerApp = ({ store }) => (
        <Provider store={store}>
            <App />
        </Provider>
    );

    const reactHtml = ReactDOMServer.renderToString(<ServerApp store={store} />);

    const helmetData = Helmet.renderStatic();

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(htmlTemplate(reactHtml, helmetData, preloadedState));
}

const app = express();

app.use('/public', express.static('./dist/public'));

app.use(morgan('combined', { stream: winston.stream }));

app.get('*', handleRender);

app.listen(PORT);

console.log('App is running on http://localhost:3000');
