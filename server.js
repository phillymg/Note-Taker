const fs = require('fs');
const express = require('express');
const path = require('path');
const UUID = require('uuid');
let dB = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = UUID.v4();
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        const newNoteArray = [...JSON.parse(data), newNote]

        fs.writeFile('./db/db.json', JSON.stringify(newNoteArray), (error, data) =>
            error ? console.error(error) : res.json(newNote)
        )
    }
    );
});

app.delete('/api/notes/:id', (req, res) => {
    const idOfNoteToDelete = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        const newNoteArray = JSON.parse(data).filter(note => note.id !== idOfNoteToDelete)

        fs.writeFile('./db/db.json', JSON.stringify(newNoteArray), (error, data) =>
            error ? console.error(error) : res.json({ "message": "Note successfully deleted" })
        )
    }
    );
});


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



app.listen(PORT, () =>
    console.log(`App is listening on port0 http://localhost:${PORT}`)
);

