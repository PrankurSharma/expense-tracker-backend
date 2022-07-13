const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.get('/api/get', (request, res) => {
        if (request.session.user) {
            const sqlSelect = "select * from money_additions where person_id = ?";
            db.query(sqlSelect, request.session.user[0].person_id, (err, result) => {
                res.send(result);
            })
        }
    });
    
    app.get('/api/gettotalincome', (request, res) => {
        if (request.session.user) {
            const sqlSelectTotal = "select sum(Amount) as amTotal from money_additions where Type = 'Income' and person_id = ?";
            db.query(sqlSelectTotal, request.session.user[0].person_id, (err, result) => {
                res.send(result);
            })
        }
    });
    
    app.get('/api/gettotalexpense', (request, res) => {
        if (request.session.user) {
            const sqlSelectTotal = "select sum(Amount) as amTotal from money_additions where Type = 'Expense' and person_id = ?";
            db.query(sqlSelectTotal, request.session.user[0].person_id, (err, result) => {
                res.send(result);
            })
        }
    });
}