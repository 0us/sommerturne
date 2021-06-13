const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

express()
    // @ts-ignore
    .use(express.static(path.join(__dirname, 'dist')))
    .get('/', (req: any, res: { render: (arg0: string, arg1: {}, arg2: (err: Error, html: string) => void) => void; }) => {

        res.render('index', {}, (err: Error, html: string) => {
            if (err) {
                console.log(err.message)
                console.log(err.stack)
            }

            if (html) {
                console.log(html)
            }
        })
    })
    .listen(port, () => console.log(`Listening on ${port}`))