var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");

app.listen(3000);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on("connection", function(socket) {
  socket.on("midi-note-on", function(data) {
    console.log("note-on", data);
  });
  socket.on("midi-note-off", function(data) {
    console.log("note-off", data);
  });
});
