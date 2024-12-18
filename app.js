const express = require('express');
var path = require('path');
const connectDB = require('./db');
const User = require('./models/User');


const app = express();
const session = require('express-session');
connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login', { error: "" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000, // 1 day in milliseconds
    },
  })
);

//user registration
app.post('/register', async (req, res) => {
  const userid = req.body.username;
  const userpass = req.body.password;

  const user = await User.findOne({ username: userid });
  if (user) {
    return res.render('registration', { error: "Sorry, Username already exists, please choose another Username" });
  } else {
    const newUser = await User.create({ username: userid, password: userpass })

    if (newUser)
      return res.render('login', { error: "Account Created Successfully, you can login now" });
    else
      return res.render('registration', { error: "Sorry, Username already exists, please choose another Username" });
  }
});


//user login
app.post('/login', async (req, res) => {
  const userid = req.body.username;
  const userpass = req.body.password;

  //check if user already exists
  const user = await User.findOne({ username: userid, password: userpass });
  if (user) {
    req.session.user = user.username;
    return res.render('home', { user });
  } else {
    return res.render('login', { error: "Missing Cridientials" });
  }

});

app.post('/bali', async (req, res) => {
  var user = req.session.user;
  var place = req.body.place;

  if (!user) {
    return res.render("login", { error: "Not Logged In!" });
  }

  try {
    const userData = await User.findOne({ username: user });
    if (userData.places.includes(place)) {
      return res.render('bali', { error: "Place already exists!" });
    }
    await User.updateOne(
      { username: user },
      { $push: { places: place } }
    );
    return res.render('bali', { error: "Place Added Successfully!" });
  } catch (err) {
    console.error(err);
    return res.render('bali', { error: "An error occurred!" });
  }
});


app.post('/inca', async (req, res) => {
  var user = req.session.user;
  var place = req.body.place;

  if (!user) {
    return res.render("login", { error: "Not Logged In!" });
  }

  try {
    const userData = await User.findOne({ username: user });
    if (userData.places.includes(place)) {
      return res.render('inca', { error: "Place already exists!" });
    }
    await User.updateOne(
      { username: user },
      { $push: { places: place } }
    );
    return res.render('inca', { error: "Place Added Successfully!" });
  } catch (err) {
    console.error(err);
    return res.render('inca', { error: "An error occurred!" });
  }
});

app.post('/paris', async (req, res) => {
  var user = req.session.user;
  var place = req.body.place;

  if (!user) {
    return res.render("login", { error: "Not Logged In!" });
  }

  try {
    const userData = await User.findOne({ username: user });
    if (userData.places.includes(place)) {
      return res.render('paris', { error: "Place already exists!" });
    }
    await User.updateOne(
      { username: user },
      { $push: { places: place } }
    );
    return res.render('paris', { error: "Place Added Successfully!" });
  } catch (err) {
    console.error(err);
    return res.render('paris', { error: "An error occurred!" });
  }
});


app.post('/santorini', async (req, res) => {
  var user = req.session.user;
  var place = req.body.place;

  if (!user) {
    return res.render("login", { error: "Not Logged In!" });
  }

  try {
    const userData = await User.findOne({ username: user });
    if (userData.places.includes(place)) {
      return res.render('santorini', { error: "Place already exists!" });
    }
    await User.updateOne(
      { username: user },
      { $push: { places: place } }
    );
    return res.render('santorini', { error: "Place Added Successfully!" });
  } catch (err) {
    console.error(err);
    return res.render('santorini', { error: "An error occurred!" });
  }
});

app.post('/rome', async (req, res) => {
  var user = req.session.user;
  var place = req.body.place;

  if (!user) {
    return res.render("login", { error: "Not Logged In!" });
  }

  try {
    const userData = await User.findOne({ username: user });
    if (userData.places.includes(place)) {
      return res.render('rome', { error: "Place already exists!" });
    }
    await User.updateOne(
      { username: user },
      { $push: { places: place } }
    );
    return res.render('rome', { error: "Place Added Successfully!" });
  } catch (err) {
    console.error(err);
    return res.render('rome', { error: "An error occurred!" });
  }
});

app.post('/annapurna', async (req, res) => {
  var user = req.session.user;
  var place = req.body.place;

  if (!user) {
    return res.render("login", { error: "Not Logged In!" });
  }

  try {
    const userData = await User.findOne({ username: user });
    if (userData.places.includes(place)) {
      return res.render('annapurna', { error: "Place already exists!" });
    }
    await User.updateOne(
      { username: user },
      { $push: { places: place } }
    );
    return res.render('annapurna', { error: "Place Added Successfully!" });
  } catch (err) {
    console.error(err);
    return res.render('annapurna', { error: "An error occurred!" });
  }
});

app.post('/homebutton', function (req, res) {
  var user = req.session.user;
  res.render('home', { user });

});

app.get('/cities', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('cities', { user });
});

app.get('/error', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('error', { user });
});

app.get('/hiking', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  // console.log(user.want_to_go.length);
  res.render('hiking', { user });
});

app.get('/home', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  // console.log(user.want_to_go.length);
  res.render('home', { user });
});

app.get('/annapurna', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('annapurna', { user, error: "" });
});

app.get('/bali', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  console.log(user);
  res.render('bali', { user, error: "" });
});

app.get('/inca', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('inca', { user, error: "" });
});

app.get('/islands', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('islands', { user });
});

app.get('/paris', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('paris', { user, error: "" });
});

app.get('/registration', function (req, res) {
  var user = req.app.locals.user;

  res.render('registration', { error: "" });
});

app.get('/rome', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('rome', { user, error: "" });

});

app.get('/santorini', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  res.render('santorini', { user, error: "" });
});

app.get('/searchresults', function (req, res) {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  arr = [];
  res.render('searchresults', { user, arr });
});

app.get('/wanttogo', async (req, res) => {
  var user = req.session.user;
  if (!user) {
    return res.render('login', { error: "You need to Login first to access this Page !" });
  }
  var userDB = await User.findOne({ username: user });
  var items = userDB.places;
  res.render('wanttogo', { user, items });
});



app.post('/search', function (req, res) {
  var text = req.body.Search.toLowerCase(); // Convert input text to lowercase
  var error = "";
  const user = req.app.locals.user;
  var filtered2 = new Array(6);
  var array = ["Paris", "Rome", "Inca", "Annapurna", "Bali", "Santorini"];

  // Filter the array case-insensitively
  var filtered = array.filter(item => item.toLowerCase().includes(text));

  // Check for matches and populate filtered2 array
  if (filtered.some(item => item.toLowerCase() === "inca".toLowerCase())) {
    filtered2[0] = "Inca";
  }
  if (filtered.some(item => item.toLowerCase() === "annapurna".toLowerCase())) {
    filtered2[1] = "Annapurna";
  }
  if (filtered.some(item => item.toLowerCase() === "paris".toLowerCase())) {
    filtered2[2] = "Paris";
  }
  if (filtered.some(item => item.toLowerCase() === "rome".toLowerCase())) {
    filtered2[3] = "Rome";
  }
  if (filtered.some(item => item.toLowerCase() === "santorini".toLowerCase())) {
    filtered2[4] = "Santorini";
  }
  if (filtered.some(item => item.toLowerCase() === "bali".toLowerCase())) {
    filtered2[5] = "Bali";
  }

  // Handle no results
  if (filtered.length === 0) {
    error = "No results Found !";
  }

  res.render('searchresults', { user, filtered2, error });
});


