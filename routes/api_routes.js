const router = require('express').Router();
const { v4 : uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');


const queryData = () => {
    return fs.promises.readFile(path.join(__dirname, '../Develop/db/db.json'), 'utf8')
    .then(data => JSON.parse(data))
}


router.get('/notes', (req, res) => {
    queryData()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
    })
})

router.post('/notes', (req, res) => {
    queryData()
    .then(data => {
        console.log(data);


        const newNoteToInput = req.body;


        data.push(newNoteToInput);

        fs.promises.writeFile(path.join(__dirname, '../Develop/db/db.json'), JSON.stringify(data))
        .then(() => {
            res.json(data);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        })
    })

})

module.exports = router;