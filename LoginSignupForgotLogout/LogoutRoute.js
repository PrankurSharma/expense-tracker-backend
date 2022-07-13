const db = require('../Database/DatabaseRoute');
module.exports = function(app) {
    app.get('/api/logout', (request, res) => {
        if (request.session.user) {
            request.session.destroy();
            res.send({ loggedIn: "false" });
            res.end();
        }
    });
}