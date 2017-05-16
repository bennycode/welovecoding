const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');

function executeCommand(command) {
  return new Promise(function (resolve) {
    console.log(`Running command: "${command}"`);
    const child = exec(command);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('exit', function () {
      resolve();
    });
  });
}

Promise.resolve()
.then(() => {
  // build backend
  return executeCommand(`cd ${path.join(__dirname, 'backend')} && npm install && npm run build`);
})
.then(() => {
  // build frontend
  return executeCommand(`cd ${path.join(__dirname, 'frontend')} && npm install && npm install --only=dev && npm run build`);
})
.then(() => {
  // copy frontend dist to backend
  return fs.ensureDir(path.join(__dirname, 'backend/dist')).then(() => {
    return fs.move(path.join(__dirname, 'frontend/dist'), path.join(__dirname, 'backend/dist/frontend'));
  });
})
.then(function () {
  console.log('Done');
  process.exit(0);
})
.catch((function (error) {
  console.error(error.message, error);
  process.exit(1);
}));
