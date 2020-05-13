export default function htmlTemplate( reactDom, helmetData ,preloadedState) {
    return `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>React server side App</title>
                    </head>
                    <body>
                        <div id="app">${reactDom}</div>
                        <script>
                            window.__PRELOADED_STATE__ = ${JSON
                                            .stringify(preloadedState)
                                            .replace(/</g,'\\u003c')}
                        </script>
                        <script src="public/client.bundle.js"></script>
                    </body>
                </html>`;
}


