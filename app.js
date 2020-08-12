var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const socketio = require('socket.io');
var cors = require('cors')
const bodyParser=require('body-parser')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./routes/users');


var accountsRouter=require('./routes/accounts');
var authRouter =require('./routes/authenticate')


var app = express();

var port = process.env.PORT || '5000'
app.set('port', port);

// view engine setup
app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/',accountsRouter);
app.use('/',authRouter);


var server = http.createServer(app);
const io = socketio(server);
io.on('connect', (socket) => {
  console.log("Socket connected!")

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) {return callback(error)}

    socket.join(user.room);
    var username=user.name.charAt(0).toUpperCase()+user.name.slice(1)
    var userroom=user.room.toUpperCase()
    socket.emit('message', { user: 'Bored Bob', text: `${username}, Welcome to ${userroom}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'Bored Bob', text: `${username} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if(user){
      io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
    }
    
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log('User has disconnected!')
    if(user) {
      var username=user.name.charAt(0).toUpperCase()+user.name.slice(1)
      io.to(user.room).emit('message', { user: 'Bored Bob', text: `${username} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});
server.listen(port,()=>{
  console.log(`Listening on Port: ${port}`)
});
if(process.env.NODE_ENV==='production')
{
 app.use(express.static(path.join(__dirname, './client/build')))
  app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client/build","index.html"))
  })
}


module.exports = app;
