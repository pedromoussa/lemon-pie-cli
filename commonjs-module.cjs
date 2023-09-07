const { program } = require('commander');
module.exports.program = program;

module.exports.createEnvironment = function (orm) {
  let templatePath;

  if (orm === 'Prisma') {
    templatePath = require.resolve('./prisma-template');
  } else {
    templatePath = require.resolve('./sequelize-template');
  }

  const createEnvironment = require(templatePath);
  createEnvironment();
};
