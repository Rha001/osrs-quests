const express = require('express');
// const parser = require('body-parser');
const port = 3100;
const app = express();
// app.use(parser);


app.get('/getQuests', (req, res) => {
    if(req.query.playerName) {
        res.send('...');
    } else {
        res.sendStatus(400);
    }
});

app.get('*', (req, res) => {
    res.send('Hello !');
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
