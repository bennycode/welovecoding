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

const npmAlias = 'yarn';
// const npmAlias = 'node --max_old_space_size=1400 /usr/bin/npm';

Promise.resolve()
.then(() => {
  // build backend
  const goToDirectory = `cd ${path.join(__dirname, 'backend')}`;
  const install = `${npmAlias} install`;
  // --only=dev is for npm and --production=false is for yarn
  const installDev = `${npmAlias} install --only=dev --production=false`;
  const build = `${npmAlias} run build`
  return executeCommand([goToDirectory, install, installDev, build].join(' && '));
})
.then(() => {
  // build frontend
  const goToDirectory = `cd ${path.join(__dirname, 'frontend')}`;
  const install = `${npmAlias} install`;
  // --only=dev is for npm and --production=false is for yarn
  const installDev = `${npmAlias} install --only=dev --production=false`;
  const build = `${npmAlias} run build`
  return executeCommand([goToDirectory, install, installDev, build].join(' && '));
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
