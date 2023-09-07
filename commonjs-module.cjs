const { program } = require('commander');
module.exports.program = program;

module.exports.createEnvironment = function(templatePath) {
  const createEnvironment = require(templatePath);
  createEnvironment();
};
