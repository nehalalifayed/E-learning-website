//::::::::::::::::::::::::::::::::::::Declaration::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var express = require('express');
  var bodyParser = require('body-parser');
  var app     = express();
  var server = require('http').createServer(app);
  var path=require('path');
  var session = require('express-session');
  var io = require('socket.io').listen(server);

  var sess;
//const Store = require('data-store');
//const store1 = new Store({ path: 'config.json' });
//::::::::::::::::::::::::::::::::::Database:::::::::::::::::::::::::::::::::::::::::::::::;
const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('/home/user29/project.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
//::::::::::::::::::::::::::::::::Sets Path and Basic Operation::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
server.listen(27183, function(){
  console.log('listening on *:' + 27183);
 });
 app.use(session({secret: 'ssshhhhh'}));
 app.use(bodyParser.urlencoded({ extended: true }));
 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.set('view engine' ,'ejs');
 app.set('views',path.join(__dirname + '/views'));
 app.use(express.static("public"));
//::::::::::::::::::::::::::::::::Go to website pages::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get('/login.html', function(req, res){
  res.sendFile(path.join(__dirname + '/views/login.html'));
  //  res.render('login');
  });
  app.get('/index.html', function(req, res){
    sess=req.session;
    console.log(sess.type);
//console.log(store1.get());
    console.log(sess.name);
      res.sendFile(path.join(__dirname + '/views/index.html'));
  });
  app.get('/rooms.html', function(req, res){
       res.sendFile(path.join(__dirname + '/views/rooms.html'));
  });
  app.get('/newroom.html', function(req, res){
    res.sendFile(path.join(__dirname + '/views/newroom.html'));
    });
  app.get('/profile.html', function(req, res){
    res.sendFile(path.join(__dirname + '/views/profile.html'));
    });

  app.get('/joinroom.html', function(req, res){
    sess=req.session;
if(req.query.id!=null)
    {  console.log(req.query.id);
       sess.roomid=req.query.id;
       sess.save();
    }

       res.sendFile(path.join(__dirname + '/views/joinroom.html'));
  });


  app.get('/chat.html', function(req, res){
    res.sendFile(__dirname + '/views/chat.html');
  });
//:::::::::::::::::::::::::::::::::::::Sokects Funcations::::::::::::::::::::::::::
  io.on('connection', function(socket){
    var x;
    socket.on('room', function(room) {
      x=room;
      console.log("hena1");
      console.log(x);
      socket.join(room);
       });

  socket.on('chat message', function(msg){
    console.log("hena2");
    console.log(x);
        io.sockets.in(x).emit('chat message',msg);
  });
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function onConnection(socket){
   var x;
  socket.on('room1', function(room) {
    x=room;
    console.log("hena1");
    console.log(x);
    socket.join(room);
     });



  socket.on('drawing', (data) => socket.broadcast.to(x).emit('drawing', data));
}
io.on('connection', onConnection);
//::::::::::::::::::::::::::::::::::::Handling Forms::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.post('/newuser', function(request, response){

   sess=request.session;



     let type='';
     if((request.body.password) != (request.body.password2))
     {    console.log(request.body.password);
              console.log(request.body.password2);
            console.log("Pss!=pass");
           response.send('Not Matching Passwords');
     }
     else{
       console.log(request.body.type1);
     if(request.body.type1!='no'){
        type='teacher';
     }
     console.log(request.body.type2);
     if(request.body.type2!='no'){
       type='student';
     }
     sess.type=type;
    sess.name=request.body.name;
    sess.save();
     let x=request.body.name;
     let y=request.body.password;
     let z="img/img1.jpg";
     db.run("INSERT INTO user VALUES(?,?,?,?)",x,y,type,z,function(err) {
       if (err) {
         response.send('unvaild');
         return console.error(err.message);

       }
    else  {  response.send('ok');
    console.log('body: ' + request.body.name);
    console.log('body: ' + request.body.password);
    console.log("3amel SignUp :",x,y,type);
          }

  });
}

});

app.post('/gotowebsite', function(request, response){
  sess=request.session;
    console.log(request.body.user1);
    console.log(request.body.password1);
    let sql1 = `SELECT password,
                      type
               FROM user
               WHERE name  = ?`;
    let name = request.body.user1;
    db.get(sql1, [name], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
    //  return row
      if(row==null)
      {  response.send('Password error');
      }
      else{
         if(row.password==request.body.password1)
            {
              response.send('ok');
              sess.type=row.type;
              sess.name=request.body.user1;
              sess.test="Ana hena";
              console.log( sess.type);
              console.log( sess.name);
              sess.save();
          //    store1.set('one', 'two');
//console.log(store1.data);
            }
            else{
              response.send('Password error');

            }

          }

      });

});
app.post('/getallrooms', function(request, response){
    console.log("Get All Rooms");
    sess=request.session;

var z=sess.type;
console.log(sess.type);
console.log(z);
   let sql = `SELECT * FROM room`;

   db.all(sql, [], (err, rows) => {
     if (err) {
       throw err;
     }
    console.log(rows);
  let y=   rows;
  let x=rows.length;
  response.send({Count:x,Rows:y,Type:z}) ;


});
});
app.post('/insertroom', function(request, response){
    console.log(request.body.txt);
    let x=request.body.txt;
    let y=true;

    db.run("INSERT INTO room VALUES(?,?)",x,y,function(err) {
      if (err) {
        response.send('unvaild');
        return console.error(err.message);
        }
        else   response.send('ok');
      });
    console.log("3amel inset room:",x,y);
});

app.post('/saveid', function(request, response){
    sess=request.session;
    console.log(request.body.id);
    let x=request.body.id;
    response.send('ok');
sess.roomid=x;
sess.save();
    console.log("Save roomid");
});




app.post('/roomview', function(request, response){
sess=request.session;
let type=sess.type;
let id=sess.roomid;
let sql = `SELECT * FROM room`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
 console.log(rows);
let y=rows[id];

let name=y.name;
sess.roomename=name;
sess.save();
console.log("Fi view room"+sess.roomename);
console.log(y.name);
console.log(name);
let sql1='SELECT * FROM enrollroom where room_name=?';
let room_name=name;

db.all(sql1,[room_name], (err, rows) => {
  if (err) {
    throw err;
  }
 console.log(rows);
response.send({type:type,roomname:name,id:id,enrolled:rows});
});
});
});

app.post('/profileview', function(request, response){
sess=request.session;
name=sess.name;
var pass;
var image;
let sql1 = `SELECT password,
                  type,image
           FROM user
           WHERE name  = ?`;

db.get(sql1, [name], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
//  return row
pass=row.password;
image=row.image;
let sql='SELECT * FROM enrollroom where user_name=?';
let user_name=name;
db.all(sql,[user_name], (err, rows) => {
  if (err) {
    throw err;
  }
 console.log(rows);
response.send({name:name,enrolled:rows ,password:pass,image:image});
});
  });



});

app.post('/getname', function(request, response){
sess=request.session;
name=sess.name;
p=sess.roomename;
x=sess.test;

console.log("hena fi server session");
console.log(sess.roomename);
response.send({name:name,room:p,test:x});
});


app.post('/gettype', function(request, response){
sess=request.session;
type=sess.type;
console.log("hena fi servr joinroom");
console.log(sess.roomename);
p=sess.roomename;
response.send({type:type,room:p});
});



app.post('/updatedimage', function(request, response){
sess=request.session;
name=sess.name;
let im=request.body.image;
let sql='UPDATE user SET image = ? where name=?';
db.run(sql,im,name);
response.send(im);
});
