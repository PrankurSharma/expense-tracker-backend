const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.post('/api/insert', (request, res) => {

        if (request.session.user) {
            const amount = request.body.amount;
            const task = request.body.task;
            const type = request.body.type;
            const date = request.body.date;
            const sqlInsert = "insert into money_additions (person_id, trans_id, Amount, Task, Type, added_date) values (?, uuid(), ?, ?, ?, ?)"
            db.query(sqlInsert, [request.session.user[0].person_id, amount, task, type, date], (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.status(200).json({});
            })
        }
    });
    
    app.delete('/api/delete/:trans_id', (request, res) => {
        if (request.session.user) {
            const id = request.params.trans_id;
            const sqlDelete = "delete from money_additions where trans_id = ? and person_id = ?";
            db.query(sqlDelete, [id, request.session.user[0].person_id], (err, result) => {
                if (err)
                    console.log(err);
                    res.status(200).json({});
            })
        }
    });
    
    app.put('/api/update', (request, res) => {
        if (request.session.user) {
            const task_name = request.body.task;
            const new_amount = request.body.amount;
            const id = request.body.trans_id;
            const sqlUpdate = "update money_additions set Task = ?, Amount = ? where trans_id = ? and person_id = ?";
    
            db.query(sqlUpdate, [task_name, new_amount, id, request.session.user[0].person_id], (err, result) => {
                if (err)
                    console.log(err);
                res.status(200).json({});
            })
        }
    });
}