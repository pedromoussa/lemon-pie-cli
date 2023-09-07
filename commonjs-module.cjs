const { program } = require('commander');
module.exports.program = program;

module.exports.createEnvironment = async function(templatePath) {
	const createEnvironment = await import(templatePath);
	createEnvironment();
};
