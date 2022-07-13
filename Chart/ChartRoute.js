const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.get('/api/getincome', (request, res) => {
        if (request.session.user) {
            const sqlSelect = "select * from money_additions where Type = 'Income' and person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
            db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
                res.send(result);
            })
        }
    });
    app.get('/api/getexpense', (request, res) => {
        if (request.session.user) {
            const sqlSelect = "select * from money_additions where Type = 'Expense' and person_id = ? and month(added_date) = month(now()) and year(added_date) = year(now())";
            db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
                res.send(result);
            })
        }
    });
}