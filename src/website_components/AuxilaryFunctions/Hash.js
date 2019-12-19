export function passwordHash(password) {
  var bcrypt = require("bcryptjs"); // Imports bcrypt
  var salt = bcrypt.genSaltSync(10); //Generates pseudo random unique salt
  var hash = bcrypt.hashSync(password, salt); //Hashes the password with given input and salt
  var hashArray = [hash, salt]; //Allows us to return both the unique salt and hash generated for storage in the databas
  return hashArray;
}

export function passwordVerify(password, salt) {
  var bcrypt = require("bcryptjs");
  return bcrypt.hashSync(password, salt); //Hashes our input password with unique salt taken from the database and returns it for comparison
}
