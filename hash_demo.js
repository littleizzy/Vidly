const bcrypt = require('bcrypt');

/*
to hash a pw, we need a salt:
  a random string added before or after pw, so resulting hash pw will be different each time we hash

1234 -> abcd
*/

//generate salt 10 rounds
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('1234', salt);
  console.log(salt);
  console.log(hashed);
}

run();
