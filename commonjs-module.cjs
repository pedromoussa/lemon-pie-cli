const { program } = require('commander');
module.exports.program = program;

const path = require('path');
module.exports.createEnvironment = async function (templatePath) {
  const templateFilePath = path.join(__dirname, templatePath).replace(/\\/g, '/').concat('.js');

  try {
    const { default: createEnvironment } = await import(`file://${templateFilePath}`);

    createEnvironment();
  } catch (error) {
    console.error(error);
  }
};