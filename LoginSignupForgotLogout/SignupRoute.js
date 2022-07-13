const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.post('/api/signup', (req, res) => {

        let person_id = req.body.person_id;
        let username = req.body.username;
        let password = req.body.password;
    
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
            }
            let sqlInsert = "insert into users (person_id, username, password) values (?, ?, ?)"
            db.query(sqlInsert, [person_id, username, hash], (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.status(200).json({});
            })
        })
    });
}