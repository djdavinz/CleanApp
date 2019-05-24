require('dotenv').config()

const expressEdge = require('express-edge')
const express = require('express')
const edge = require('edge.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

const DATABASE_NAME = "cleanapp";
const app = new express()

// connecting to mongoose
// mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// })


var database, collection;

app.listen(3000, () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("User");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


const mongoStore = connectMongo(expressSession);

// CONTROLLERS
const dashController = require('./controllers/dash')
const addWorkerController = require('./controllers/addWorker')
const addTaskController = require('./controllers/addTask')
const addClientController = require('./controllers/addClient')
const createUserController = require('./controllers/createUser')
const storeTaskController = require('./controllers/storeTask')
const storeWorkerController = require('./controllers/storeWorker')
const storeClientController = require('./controllers/storeClient')
const storeUserController = require('./controllers/storeUser')
const trackRadarUserController = require('./controllers/trackUsers')
const trackRadarEventController = require('./controllers/trackEvents')
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser")
const getWorkerByIdController = require("./controllers/getWorker")
const getClientByIdController = require("./controllers/getClient")
const listWorkersController = require("./controllers/listWorkers")
const listClientsController = require("./controllers/listClients")
const listTasksController = require("./controllers/listTasks")
const logoutController = require("./controllers/logout");

app.use(connectFlash())

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'))
app.use(expressEdge)

app.set('views', `${__dirname}/views`)

// EDGE GLOBAL MIDDLEWARE 
app.use("*", (req, res, next) => {
    edge.global("auth", req.session.userId);
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// MIDDLEWARE
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectifAuthenticated")

// Router
app.get('/', auth, dashController)
app.get('/workers/new', auth, addWorkerController)
app.get('/tasks/new', auth, addTaskController)
app.get('/clients/new', auth, addClientController)
app.get("/auth/logout", auth, logoutController)
app.get('/auth/register', redirectIfAuthenticated, createUserController)
app.get("/auth/login", redirectIfAuthenticated, loginController)
app.post("/users/login", redirectIfAuthenticated, loginUserController)


// Store data from form
app.post('/users/register', redirectIfAuthenticated, storeUserController)
app.post('/tasks/store', auth, storeTaskController)
app.post('/workers/store', auth, storeWorkerController)
app.post('/client/store', auth, storeClientController)

// Responsive posts by ID * Tasks have not been added to this list. Task and Site need to be created separately later
app.get('/worker/:id', auth, getWorkerByIdController)
app.get('/client/:id', auth, getClientByIdController)

// Get data from Radar API
app.get('/getRadarUsers', auth, trackRadarUserController)
app.get('/getRadarEvents', auth, trackRadarEventController)

// Get data from database
app.get('/worker', auth, listWorkersController)
app.get('/task', auth, listTasksController)
app.get('/client', auth, listClientsController)

app.use((req, res) => res.render('not-found'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})