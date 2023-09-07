const { program } = require('commander');
module.exports.program = program;

module.exports.createEnvironment = async function(templatePath) {
	const absolutePath = path.join(__dirname, templatePath);
	const createEnvironment = await import(absolutePath);
	createEnvironment();
};
