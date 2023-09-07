const { program } = require('commander');
module.exports.program = program;

module.exports.createEnvironment = async function (orm) {
  let templatePath;

  if (orm === 'Prisma') {
    templatePath = require.resolve('./prisma-template');
  } else {
    templatePath = require.resolve('./sequelize-template');
  }

  const createEnvironment = await import(templatePath);
  createEnvironment();
};
