'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
  socket.join(socket.request.user._id);
  // Send a toggleDevice
  socket.on('toggleDevice', function (data) {
    // Emit the 'toggleDevice' event
    socket.broadcast.to(socket.request.user._id).emit('toggleDevice', data);
  });
};
