require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT;

app.use( express.static('public'));


app.get('/generic', (req, res) => {
    res.sendFile(__dirname + '/public/generic.html');
  });

app.get('/elements', (req, res) => {
    res.sendFile(__dirname + '/public/elements.html');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
  });

app.listen(port, () => {
    console.log(`App ejemplo escuchando en http://localhost:${port}`)
})