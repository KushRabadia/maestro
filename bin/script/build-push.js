(async function run() {
  await lint();

  async function exec(cmd) {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    return exec(cmd);
  }

  async function lint() {
    console.log('');
    console.log(`>> linting`);

    await exec('ng lint').catch((err) => {
      console.log();
      console.log(`*** linting errors ***`);
      console.log(err.stdout);
      console.log();
      throw error(`Fix all linting issues.`);
    });
  }
})().catch((err) => {
  console.log(`*** push failed ***`);
  console.log(err.toString().split('\n')[0]);
  console.log();
  process.exit(1);
});
