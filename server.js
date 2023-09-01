const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    const notesPath = path.join(__dirname, './public/notes.html');
    res.sendFile(notesPath)
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, data) =>
        error ? console.error(error) : res.json(JSON.parse(data))
    );
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () =>
    console.log(`App is listening on port0 http://localhost:${PORT}`)
);

