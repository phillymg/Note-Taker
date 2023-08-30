const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    const notesPath = path.join(__dirnam, '../notes.html');
    res.sendFile(notesPath)
});

app.listen(PORT, () =>
    console.log(`App is listening on port http://localhost:${PORT}`)
);