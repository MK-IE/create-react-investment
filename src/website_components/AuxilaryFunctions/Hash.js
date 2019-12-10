export function passwordHash(password)
{
	var bcrypt = require('bcryptjs');
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	var hashArray = [hash, salt]; 
	return hashArray;
}

export function passwordVerify(password, salt)
{
	var bcrypt = require('bcryptjs');
	return bcrypt.hashSync(password, salt);
}
