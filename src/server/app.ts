import express, { Request, Response } from 'express';
import path from 'path';
import { createServer } from 'http';
import { cyan, green, red, yellow } from 'chalk';
import { times } from 'ramda';
import WS from 'socket.io';

const app = express();
const server = createServer(app);
const io = WS(server);
const port = 3003;
let videoId = 3319;
const placeholder = '{ src: \'http://www.quebec511.info/diffusion/camera/camera.ashx?format=mp4&id=videoId\' }';

app.use(express.static(path.resolve(__dirname, './build')));

io.on('connection', function(socket) {
  console.log(`${green('[SS]')} ${yellow('-->')} user ${cyan(socket.client.id)} connected`);
  socket.on('disconnect', () => {
    console.log(`${red('[SS]')} ${yellow('-->')} user ${cyan(socket.client.id)} disconnected`);
  });
});

app.get('*', function(req: Request, res: Response, next) {
  videoId = 3319;
  console.log(`${yellow('[SS]')} refreshed, back to item ${videoId}`);
  res.end(`<html>
    <head>
    <title>:: *7* ::</title>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var initialState = {
        current: 0,
        camera: [
          ${ times(() => placeholder.replace('videoId', (videoId ++).toString()), 8).join(',')}
        ],
      };
      var socket = io();
    </script>
    </head><body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
    </body></html>`);
});

server.listen(port, () => {
  console.log(`${yellow('[SS]')} started at port ${cyan(port.toString())} in item ${videoId}`);

  process.stdin.on('data', function(chunk) {
    const chunkStr = chunk.toString('utf-8');
    const command = chunkStr.substring(0, chunkStr.indexOf('\n')).toLowerCase();
    switch (command) {
      case 'clear':
        io.emit(command);
        console.log(`${yellow('[SS]')} clearing playlist, next video starts at ${cyan((videoId + 1).toString())}`);
        break;
      case 'restart':
        io.emit(command);
        console.log(`${yellow('[SS]')} restart current playlist`);
        break;
      case 'add':
        io.emit(command, {
          src: `http://www.quebec511.info/diffusion/camera/camera.ashx?format=mp4&id=${++ videoId}`,
        });
        console.log(`${yellow('[SS]')} Added ${cyan(videoId.toString())} video...`);
        break;
      default:
    }
  });
});
