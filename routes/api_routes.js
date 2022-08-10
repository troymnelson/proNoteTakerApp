const router = require('express').Router();
const { v4 : uuid} = require('uuid');
const path = require('path');
const fs = require('fs');



const queryData = () => {
    return fs.promises.readFile(path.join(__dirname, '../Develop/db/db.json'), 'utf8')
    .then(data => JSON.parse(data))
};


router.get('/notes', (req, res) => {
    queryData()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
    });
});

router.post('/notes', (req, res) => {
    queryData()
    .then(data => {
        console.log(data);


        const newNoteToInput = req.body;

        newNoteToInput.id = uuid().slice(0, 6);

        data.push(newNoteToInput);

        fs.promises.writeFile(path.join(__dirname, '../Develop/db/db.json'), JSON.stringify(data))
        .then(() => {
            res.json(data);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
    });

});


router.delete('/notes/:id', (req, res) => {
    queryData()
        .then(data => {

            let id = req.params.id
            let NewNote = data.filter(currentNote => currentNote.id != id);

            fs.promises.writeFile(path.join(__dirname, '../Develop/db/db.json'), JSON.stringify(NewNote, null, 2))
                .then(() => {
                    res.json(newNote);
                })
                .catch(err => {
                    if (err) return console.log(err);
                });
        });
});

module.exports = router;