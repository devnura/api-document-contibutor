const express = require('express');
const app = express();
// const cors = require('cors')
const morgan = require('morgan')
const addRequestId = require('express-request-id')({setHeader: false});
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const moment = require('moment')
// ---
//get dates
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;

//create folder/file if not exists
if (!fs.existsSync(`./logs`)) {
    fs.mkdirSync(`./logs`)
}
if (!fs.existsSync(`./logs/log-${month}`)) {
    fs.mkdirSync(`./logs/log-${month}`)
}

//create filestream
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', `log-${month}`, `access-${day}.log`), { flags: 'a' });

//get request ID
app.use(addRequestId)
app.use(express.json());

//create morgan token
morgan.token('id', (req) => { return req.id })
morgan.token('req-body', (req, res) => { return JSON.stringify(req.body) })
morgan.token('res-body', (_req, res) =>
  JSON.stringify(res.__custombody__),
)
morgan.token('date-wib', () => { return moment().format('YYYY-MM-DD HH:mm:SS') })

//log morgan
app.use(morgan('[:date-wib] | { "id": ":id", "tag":"REQ", "from":":remote-addr", "metode":":method", "endpoint":":url", "time":":date-wib", "payload"::req-body }', { stream: accessLogStream, immediate: true }));
app.use(morgan('[:date-wib] | { "id": ":id", "tag":"RES", "from":":remote-addr", "metode":":method", "endpoint":":url", "time":":date-wib", "response-time":":response-time ms", "payload"::res-body }', { stream: accessLogStream}));

app.use(
    express.urlencoded({
        extended: false
    })
)

var router = express.Router();

var connectionRouter = require('./app/controllers/connectionController/routes')
var loginRouter = require('./app/controllers/loginController/routes')
var userRouter = require('./app/controllers/userController/routes')

//route v1
app.use('/api/v1/', router);

router.use('/connection', connectionRouter)
router.use('/login', loginRouter)
router.use('/user', userRouter)

const port = process.env.APP_PORT || 9000

app.listen(port, () => {
    console.log(`System is listening to port ${port}`)
})