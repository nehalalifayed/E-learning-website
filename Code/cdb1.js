
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/home/user29/project.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

db.run('CREATE table user (name varchar(30) primary key,password int ,type varchar(30),image varchar(100))');
db.run('CREATE table room (name varchar(30) primary key,availbe boolean)');
db.run('CREATE table enrollroom (user_name varchar(30) ,room_name varchar(30) )');