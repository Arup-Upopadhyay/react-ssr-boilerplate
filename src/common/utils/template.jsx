export default function htmlTemplate( reactDom, helmetData ) {
    return `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>React server side App</title>
                    </head>
                    <body>
                        <div id="app">${reactDom}</div>
                        <script src="public/client.bundle.js"></script>
                    </body>
                </html>`;
}


