const {express,mongoose,cors, DB_URL } = require('./config');

const app = express();
const serviceRouter = require('./routes/service');
const userRouter = require('./routes/users');
const itemRouter = require('./routes/item');
const scheduleRouter = require('./routes/schedule');
const reviewRouter = require('./routes/review');
const auth = require('./auth');

app.use(cors());

app.use('/public', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

    
    app.use(userRouter);
    app.use(itemRouter);
    app.use(serviceRouter);
    app.use(scheduleRouter);
    app.use(reviewRouter);

    // 404 ERROR ENDPOINT NOT FOUND ERROR HANDLER 
    app.use((req,res,next)=>{
        const error = new Error("404 undefined endpoints");
        error.status = 404;
        throw error;
    });

    // GENERAL ERROR HANDLER EXPRESS MIDDLEWARE
    app.use((err,req,res,next)=>{
        const message = err.message||'no resource found';
        const status = err.status || 500;
        res.status(status).json({
            message:message,
        });
    });
   
    
    app.listen(process.env.PORT, () => {
        console.log(`App is running at localhost:${process.env.PORT}`);
    });