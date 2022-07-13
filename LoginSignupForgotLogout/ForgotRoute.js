const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.put('/api/forgot', (request, res) => {
        let person_id = request.body.person_id;
        let newpassword = request.body.newpassword;
        bcrypt.hash(newpassword, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
            }
            let sqlSelect = "select * from users where person_id = ?";
            let sqlUpdate = "update users set password = ? where person_id = ?";
            db.query(sqlSelect, person_id, (error, ress) => {
                if (ress.length > 0) {
                    db.query(sqlUpdate, [hash, person_id], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.status(200).json({});
                        }
                    })
                }
                else {
                    res.send({ message: "ID doesn't exist." });
                }
            })
        })
    });
}