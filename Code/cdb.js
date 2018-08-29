
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/home/user29/project.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

// db.run('CREATE table user (name varchar(30) primary key,password int ,type varchar(30),image varchar(100))');
// db.run('CREATE table room (name varchar(30) primary key,availbe boolean)');
// db.run('CREATE table enrollroom (user_name varchar(30) ,room_name varchar(30) )');

db.run('INSERT INTO user VALUES(\'nehal\',123,\'teacher\',\'img/img1.jpg\')');
db.run('INSERT INTO user VALUES(\'yara\',1234,\'teacher\',\'img/img1.jpg\')');

db.run('INSERT INTO user VALUES(\'Doaa\',159,\'student\',\'img/img1.jpg\')');
db.run('INSERT INTO user VALUES(\'neama\',147,\'student\',\'img/img1.jpg\')');
db.run('INSERT INTO user VALUES(\'alyaa\',1235,\'student\',\'img/img1.jpg\')');
db.run('INSERT INTO user VALUES(\'essam\',132,\'student\',\'img/img1.jpg\')');

db.run('INSERT INTO enrollroom VALUES(\'yara\',\'computer\')');
db.run('INSERT INTO enrollroom VALUES(\'yara\',\'English\')');
db.run('INSERT INTO enrollroom VALUES(\'yara\',\'MAth\')');
db.run('INSERT INTO enrollroom VALUES(\'yara\',\'science\')');
db.run('INSERT INTO enrollroom VALUES(\'nehal\',\'computer\')');
db.run('INSERT INTO enrollroom VALUES(\'nehal\',\'English\')');
db.run('INSERT INTO enrollroom VALUES(\'nehal\',\'MAth\')');
db.run('INSERT INTO enrollroom VALUES(\'nehal\',\'science\')');


db.run('INSERT INTO enrollroom VALUES(\'Doaa\',\'MAth\')');
db.run('INSERT INTO enrollroom VALUES(\'Doaa\',\'English\')');
db.run('INSERT INTO enrollroom VALUES(\'Doaa\',\'science\')');

db.run('INSERT INTO enrollroom VALUES(\'neama\',\'computer\')');
db.run('INSERT INTO enrollroom VALUES(\'neama\',\'science\')');
db.run('INSERT INTO enrollroom VALUES(\'neama\',\'MAth\')');



db.run('INSERT INTO enrollroom VALUES(\'essam\',\'computer\')');
db.run('INSERT INTO enrollroom VALUES(\'essam\',\'science\')');
db.run('INSERT INTO enrollroom VALUES(\'essam\',\'English\')');


db.run('INSERT INTO enrollroom VALUES(\'alyaa\',\'MAth\')');
db.run('INSERT INTO enrollroom VALUES(\'alyaa\',\'English\')');
db.run('INSERT INTO enrollroom VALUES(\'alyaa\',\'computer\')');


db.run('INSERT INTO room VALUES(\'science\',1)');
db.run('INSERT INTO room VALUES(\'MAth\',1)');
db.run('INSERT INTO room VALUES(\'computer\',1)');
db.run('INSERT INTO room VALUES(\'English\',1)');
db.run('INSERT INTO room VALUES(\'Arabic\',1)');