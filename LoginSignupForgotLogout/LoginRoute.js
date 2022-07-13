const bcrypt = require('bcrypt');
const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.post('/api/login', (request, response) => {
        let person_id = request.body.person_id;
        let password = request.body.password;
        if (person_id && password) {
            db.query('SELECT * FROM users WHERE person_id = ?', person_id, function (error, results) {
                if (error) {
                    response.send({ error: error });
                }
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password, (err, res) => {
                        if (res) {
                            request.session.user = results;
                            response.send(results);
                        }
                        else {
                            response.send({ message: " Wrong ID or password." });
                        }
                    })
                }
                else {
                    response.send({ message: "User doesn't exist." });
                }
            });
        }
    });
    
    app.get('/api/login', function (request, response) {
        let sqlSelect = "select * from users where person_id = ?";
        if(request.session.user){
            db.query(sqlSelect, request.session.user[0].person_id, (error, results) => {
                if(results.length > 0){
                    if(request.session.user[0].password === results[0].password){
                        response.send(request.session.user);
                    }
                    else{
                        response.send({message: "Your account details were modified. Please login using new credentials."});
                    }
                }
                else{
                    response.send({message: "This account was deleted. So, the request was not completed. Press OK to login/register your account."});
                }
            })
        }
        else{
            response.send({error: "Please login to your account."});
        }
    });
}