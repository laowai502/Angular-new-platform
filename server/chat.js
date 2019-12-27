

module.exports = (server) => {
    const io = require('socket.io')(server);
    let userList = [];
    io.on('connection', function(socket) {
        socket.on('login', function(user){
            socket.broadcast.emit('login',user);
            userList.push(user)
            io.sockets.emit('userList', userList);
        })
        socket.on('chat', function(msg) {
            socket.broadcast.emit('chat', msg);
        })
        socket.on('logout', function(user) {
            socket.broadcast.emit('logout',user);
            userList = userList.filter(item => {
                return item.userId !== user.userId
            })
            console.log(userList)
            io.sockets.emit('userList', userList);
        })
    })

}

