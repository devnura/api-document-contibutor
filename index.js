require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use('/static', express.static('doc-files'))

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const router = express.Router();

const connectionRouter = require('./app/controllers/connectionController/routes')
const loginRouter = require('./app/controllers/loginController/routes')
const userRouter = require('./app/controllers/userController/routes')
const roleRouter = require('./app/controllers/roleController/routes')
const documentRouter = require('./app/controllers/documentController/routes')
const settingRouter = require('./app/controllers/parameterController/routes')

//route v1
app.use('/api/v1/', router);

router.use('/connection', connectionRouter)
router.use('/login', loginRouter)
router.use('/user', userRouter)
router.use('/role', roleRouter)
router.use('/document', documentRouter)
router.use('/setting', settingRouter)

const port = process.env.APP_PORT || 9000

app.listen(port, () => {
    console.log(`System is listening to port ${port}`)
})