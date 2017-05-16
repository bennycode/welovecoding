const exec = require('child_process').exec;
const path = require('path');
// const fs = require('fs-extra');

function executeCommand(command) {
  return new Promise(function (resolve) {
    console.log(`Running command: ${command}`);
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
    return executeCommand(`cd ${path.join(__dirname, 'backend')} && npm install && npm run build`);
  })
  .then(() => {
    return executeCommand(`cd ${path.join(__dirname, 'frontend')} && npm install && npm install --only=dev && npm run build`);
  })
  .then(function () {
    console.log('Done');
    process.exit(0);
  })
  .catch((function (error) {
    console.error(error.message, error);
    process.exit(1);
  }));
