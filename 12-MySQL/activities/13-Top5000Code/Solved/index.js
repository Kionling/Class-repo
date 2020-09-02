var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "top_songsDB"
});

connection.connect(async function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  const {nextStep} = await inquirer.prompt({
    type: "list",
    message: "What do you want to do?",
    name: "nextStep",
    choices: [
      {
        name: "Search by artist",
        value: findByArtist,
      },
      {
        name: "See artists with 10 or more songs",
        value: findTopArtists,
      },
      {
        name: "View a range of positions",
        value: findByPosition,
      },
      {
        name: "Search by song title",
        value: findByTitle,
      }
    ]
  });
  nextStep();
});

async function findByArtist() {
  const {artist} = await inquirer.prompt({
    type: "input",
    message: "Enter artist name:",
    name: "artist"
  });

  connection.query("SELECT position, song, year FROM top5000 WHERE ?", {
    artist: artist
  }, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

async function findTopArtists() {
  connection.query("SELECT COUNT(position), artist FROM top5000 GROUP BY artist HAVING COUNT(position) > 9 ORDER BY COUNT(position) DESC", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

async function findByPosition() {
  const {minPosition, maxPosition} = await inquirer.prompt([{
    type: "number",
    message: "Enter starting position:",
    name: "minPosition"
  },
  {
    type: "number",
    message: "Enter ending position:",
    name: "maxPosition"
  }]);

  connection.query("SELECT position, song, artist, year FROM top5000 WHERE position BETWEEN ? AND ?", 
    [minPosition, maxPosition],
    function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

async function findByTitle() {
  const {title} = await inquirer.prompt({
    type: "input",
    message: "Enter song title:",
    name: "title"
  });

  connection.query("SELECT position, song, artist, year FROM top5000 WHERE ?", {
    song: title
  }, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}