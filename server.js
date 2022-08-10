const express = require('express');
const PORT = process.env.PORT || 3333;
const path = require('path');
const app = express();
const api_routes = require('./routes/api_routes');
const note_routes = require('./routes/note_routes');

// allow browser to see public files
app.use(express.static(path.join(__dirname, 'Develop/public')));

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api', api_routes);

app.use('/notes', note_routes);


//listen for port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

