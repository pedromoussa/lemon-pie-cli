const { program } = require('commander');
module.exports.program = program;

const path = require('path');
module.exports.createEnvironment = async function (templatePath) {
  const absolutePath = `file://${path.join(__dirname, templatePath).replace(/\\/g, '/')}`;
  const createEnvironment = await import(absolutePath);
  createEnvironment();
};
