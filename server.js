const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//////////// my route 
// Temporary storage for tasks
// Temporary storage for tasks
let tasks = [];

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { tasks: tasks });
});
app.get('public/css/style.css', (req, res) => {
  res.render('index', { tasks: tasks });
});
// Route to add a task
app.post('/add', (req, res) => {
  const newTask = req.body.newTask;
  tasks.push(newTask);
  res.redirect('/');
});


// Route to delete a task
router.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task, index) => {
    return index != id;
  });
  res.redirect('/');
});

// Apply the routes to the application
app.use('/',router );