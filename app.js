var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./utils/db");
const dotenv = require("dotenv");
const colors = require("colors");
// const bodyParser = require("÷")

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const examRouter = require("./routes/exam");
const questionRouter = require("./routes/question");
const customerRouter = require("./routes/customer");
const behaviourRouter = require("./routes/behaviour");
const responseRouter = require("./routes/Response");
const answerRouter = require("./routes/answer");
const userLogRouter = require("./routes/UserLog");
const session = require("express-session");
const MongoStore = require("connect-mongo");
var bodyParser = require("body-parser");
dotenv.config({ path: ".env" });

console.log(process.env.SESSION_SECRET);
var cors = require("cors");
var app = express();

// Setup env file

// Connecting to DB
connection = connectDB();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Before the routes
// SESSION ( & COOKIES ) MIDDLEWARE   -- req.session.currentUser
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // cookie: { maxAge: 3600000 } // 1 hour
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/exam", examRouter);
app.use("/users", usersRouter);
app.use("/question", questionRouter);
app.use("/customer", customerRouter);
app.use("/behaviour", behaviourRouter);
app.use("/answer", answerRouter);
app.use("/response", responseRouter);
// app.use("/search", searchRouter);
app.use("/log", userLogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

module.exports = app;
