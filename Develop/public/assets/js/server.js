const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile(`Develop/db/db.json`,
        (err, data) => {
            if (err) throw err;
            res.send(data);
        })
});






app.get('/notes', (req, res) => {
    const notesPath = path.join(__dirname, '../notes.html');
    res.sendFile(notesPath)
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () =>
    console.log(`App is listening on port0 http://localhost:${PORT}`)
);

