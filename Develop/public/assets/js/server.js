const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/send', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);

app.get('/routes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/routes.html'))
);


app.get('/notes', (req, res) => {
    const notesPath = path.join(__dirnam, '../notes.html');
    res.sendFile(notesPath)
});

app.listen(PORT, () =>
    console.log(`App is listening on port0 http://localhost:${PORT}`)
);

