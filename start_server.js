const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./err.log', 'a');

console.log("Starting Angular server in detached mode...");

// Spawn npx ng serve completely detached from the current shell
const server = spawn('cmd.exe', ['/c', 'npx ng serve --analytics false'], {
  detached: true,
  stdio: ['ignore', out, err],
  windowsHide: true,
  cwd: __dirname
});

server.unref();
console.log("Server spawned with PID:", server.pid);
