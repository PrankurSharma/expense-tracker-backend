const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
var port = process.env.PORT || 3001;

const options = {
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_USER,
    host: process.env.DB_HOST,
    createDatabaseTable: true
}

const pool = mysql.createPool(options);

const sessionStore = new mysqlStore(options, pool);

app.use(cors({
	origin: [process.env.URL],
	methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
	credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
	name: process.env.SESS_NAME,
	secret: process.env.SESS_SECRET,
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365,
		httpOnly: true,
		secure: process.env.NODE_ENV == 'production' ? true : false,
		sameSite: 'none'
	}
}));

require('./LoginSignupForgotLogout/SignupRoute')(app);

require('./LoginSignupForgotLogout/LoginRoute')(app);

require('./LoginSignupForgotLogout/ForgotRoute')(app);

require('./LoginSignupForgotLogout/LogoutRoute')(app);

require('./InsertDeleteUpdate/InsDelUpdRoute')(app);

require('./MonthTrans/MonthRoute')(app);

require('./Chart/ChartRoute')(app);

require('./AllTrans/AllRoute')(app);

require('./FilterTrans/FilterRoute')(app);

app.listen(port, () => {
	console.log('running on port ' + port);
});