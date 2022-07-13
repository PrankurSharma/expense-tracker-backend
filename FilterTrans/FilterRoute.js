const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.post('/api/filter', (request, res) => {
        if (request.session.user) {
            let month = request.body.month;
            let year = request.body.year;
            const sqlFilter = "select * from money_additions where person_id = ? and month(added_date) = ? and year(added_date) = ?";
            db.query(sqlFilter, [request.session.user[0].person_id, month, year], (err, result) => {
                res.send(result);
            })
        }
    });
    app.post('/api/filterincome', (request, res) => {
        if (request.session.user) {
            let month = request.body.month;
            let year = request.body.year;
            const sqlIncome = "select sum(Amount) as amTotal from money_additions where person_id = ? and month(added_date) = ? and year(added_date) = ? and Type = 'Income'";
            db.query(sqlIncome, [request.session.user[0].person_id, month, year], (err, result) => {
                res.send(result);
            })
        }
    });
    
    app.post('/api/filterexpense', (request, res) => {
        if (request.session.user) {
            let month = request.body.month;
            let year = request.body.year;
            const sqlIncome = "select sum(Amount) as amTotal from money_additions where person_id = ? and month(added_date) = ? and year(added_date) = ? and Type = 'Expense'";
            db.query(sqlIncome, [request.session.user[0].person_id, month, year], (err, result) => {
                res.send(result);
            })
        }
        else {
            res.send({ message: "Please login to continue." });
        }
    });
}