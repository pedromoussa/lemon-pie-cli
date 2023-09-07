const { program } = require('commander');
module.exports.program = program;

module.exports.createEnvironment = async function(templatePath) {
	const path = require('path');
	const absolutePath = path.join(__dirname, templatePath);
	const createEnvironment = await import(absolutePath);
	createEnvironment();
};
